const mongoose = require('mongoose'),
Objective = mongoose.model('Objective');
Config = mongoose.model('Config');
var notificationsCtrl =  require('./notifications');

exports.findAll = function(req, res){
  Objective.find({},function(err, results) {
    return res.send(results);
  });
};

exports.findByOwner = function(req, res) {
  Objective.find({'owner.eid': req.query.id},function(err, results) {
    return res.send(results);
  });
}

exports.checkinKeyResults = function (req, res) {
  const keyScores = req.body.actual;
  keyScores.forEach( (x) => {
    const id = x.id; //mongoose.Types.ObjectId(x.id);
    Objective.findOneAndUpdate(
      {'keyresults._id': id}, 
      {$set: {'keyresults.$.actual': x.actual}},
      {upsert: true},
      function (err, newObj) {
        calcObjProgress(newObj._id); // Re-calculate progress
        if (err) return console.log(err);
      });
  });
  res.sendStatus(202);
}

exports.findByName = function(req, res) {
  const q = req.query;
  let qString = '';
  if (q.name) {
    qString = {'name': {'$regex': q.name, $options: 'i'}};
  }

  if (q.eid) {
    qString = {'owner.eid': q.eid};
  }

  Objective.find(qString,function(err, result) {
    return res.send(result);
  });
};

exports.findKeyResultsByEmp = function(req, res) {
  const q = req.query;
  let qString = '';

  if (q.eid) {
    qString = {'keyresults.owner.eid': q.eid};
  }

  const callback = function(err, result) {
    return res.send(result);
  }

  Objective.aggregate(
    { $project : {
        _id : 1,
        name : 1,
        owner: 1,
        keyresults : 1
    }},
    { $unwind : "$keyresults" },
    { $match: {'keyresults.owner.eid': q.eid}}
  ).exec(callback);

};

exports.findById = function(req, res){
  const id = req.params.id;
  Objective.findOne({'_id':id},function(err, result) {
    return res.send(result);
  });
};

exports.add = function(req, res) {
  let objective = req.body;
  if (objective.pobjective) {
    objective.pobjective = mongoose.Types.ObjectId(objective.pobjective);
  }

  Objective.create(objective, function (err, obj) {
    if (err) return console.log(err);

  // Udpate parent's child objectives array
  Objective.findOneAndUpdate({"_id": obj.pobjective}, 
    {$push: {cobjectives: obj._id}}, {new: true},
    function (err, updatedRec) {
      if (err) return console.error(err);
    });

  console.log(req.body);

    // Create a notification
    const notification = {
      actionurl: '/objectives/'+obj._id,
      notification: 'A new objective assigned to you. Objective: ' + obj.name,
      personid: req.body.owner.eid,
      datetime: new Date(),
      status: 'Unread'
    };
    
    notificationsCtrl.addNewNotification(notification, console.log, console.error);
    return res.send(obj);
  });
}

exports.findByTagName = function(req, res){
  const str = req.params.str;
  Objective.find({'tags': [{'name': {'$regex': str, $options: 'i'}}] },function(err, result) {
    return res.send(result);
  });
};

exports.update = function(req, res) {
  const id = req.params.id;
  const updates = req.body;

  Objective.update({"_id":id}, req.body,
    function (err, numberAffected) {
      if (err) return console.log(err);
      res.sendStatus(202);
  });
}

exports.addKeyResult = function (req, res) {
  const id = req.params.id;
  const unit = req.body.units;

  if (unit) {
    const query = {domain: 'units', value: unit.value};
    Config.findOneAndUpdate(query, query, {upsert:true}, function(err, doc){
      if (err) console.error(err);
      console.log(doc);
    });
  }

  Objective.findOneAndUpdate({"_id":id}, 
    {$push: {keyresults: req.body}}, {new: true},
    function (err, updatedRec) {
      if (err) return console.error(err);
      const notification = {
        actionurl: '/objectives/'+id,
        notification: 'A new key result assigned to you. Keyresult: ' + req.body.name,
        personid: req.body.owner.eid,
        datetime: new Date(),
        status: 'Unread'
      };
      notificationsCtrl.addNewNotification(notification, console.log, console.error);
      res.send(updatedRec);
  });
}

exports.delete = function(req, res){
  const id = req.params.id;
  Objective.remove({'_id':id},function(result) {
    return res.send(result);
  });
};  

exports.import = function(req, res){
  Objective.create(
    { "name": "IT Objective" },
    { "name": "Healthcare Objective." },
    { "name": "Dad's Objective" },
    { "name": "Watchlist Objective" }
  , function (err) {
    if (err) return console.log(err);
    return res.sendStatus(202);
  });
};

exports.getChildObjectives = function(req, res){
  const id = req.query.id;
  Objective.find({pobjective: mongoose.Types.ObjectId(id)},function(err, result) {
    return res.send(result);
  });
};

exports.getAllParentObjectives = function (req, res) {
  const id = req.query.id;
  var objectiveList = [];

  function getParentObjective(objId) {
    if (objId == '') return res.send(objectiveList);

    Objective.findOne(
      {'_id': mongoose.Types.ObjectId(objId)}
    ).exec((err, result) => {
      if (err) return res.send(err);

      if (!result) return res.send(objectiveList); // return if there is no futher parent

      objectiveList.push(result); // Push objective to list
      if (result.pobjective != '') {
        getParentObjective(result.pobjective); 
      }
      else {
        return res.send(objectiveList);
      }
   })
  }

  var initObjective = {};

  Objective.findOne(
    {'_id': mongoose.Types.ObjectId(id)}
  ).exec((err, result) => {
      console.log('result: ', result);
      objectiveList.push(result);
      // const parentObjectiveId = result.pobjective;
      getParentObjective(result.pobjective);
   }
  )
}

const _getPObjectives = (id, objectiveList, callback) => {
  getParentObjective(id);
  function getParentObjective(objId) {
    if (undefined == objId) {callback(); return;} 
    Objective.findOne({'_id': mongoose.Types.ObjectId(objId)}, 
        (err, result) => {
          if (err) {callback(); return;}
          if (result == null || undefined == result) {callback(); return;}
          objectiveList.push(result); // Push objective to list
          if (result.pobjective) getParentObjective(result.pobjective)
        }
    )
  }
}

const getPObjectives = (id, objectiveList, callback) => {
  if (id == '') {callback(); return;};  
  Objective
  .findOne({'_id': mongoose.Types.ObjectId(id)})
  // .populate('cobjectives')
  .exec(function (err, objective) {
    if (err) {callback(); console.error(err); return;};
    objectiveList.push(objective);
    if (objective || objective.pobjective){
      getPObjectives(objective.pobjective, objectiveList, callback);
    }
    else {
      callback();
      return;
    }
  });
}

const calcObjProgress = (id) => {
console.log('---------------------------- Calc called for ', id);
  // STEP 1: Get all child objectives with populate i.e. progress values
  Objective
  .findOne({'_id': mongoose.Types.ObjectId(id)})
  .populate('cobjectives')
  .exec(function (err, obj) {
    if (err) {console.error(err); return;}
console.log('inner loop: ', obj.name);
    // STEP 2: calculate current objective progress based on the child objective progress and key results
    const kr = obj.keyresults;
    const sumFunc = (arr) => arr.map( x => Math.round(x.actual * 100 / x.target)).reduce((x1, x2) => x1 + x2, 0);
    const krSum = kr.length > 0 ? sumFunc(kr) : 0;
    const co = obj.cobjectives;
    const coSum = co.length > 0 ? co.map( c => c.progress ).reduce( (x1, x2) => x1 + x2, 0) : 0;
    const oProgress = Math.round((kr.length + co.length) > 0 ? (krSum + coSum) / (kr.length + co.length) : 0);
console.log(obj.name, krSum, coSum, oProgress);
    // STEP 3: update currnet objective progress
    Objective.findOneAndUpdate(
      {"_id": mongoose.Types.ObjectId(id)},
      {$set: {progress: oProgress}},
      function (err, updatedRec) {
        if (err) return console.error(err);
        // STEP 4: calc calcObjProgress for it's parent node
        if (updatedRec.pobjective) {
console.log('calling calcObjProgress for parent objective', updatedRec.pobjective);
          calcObjProgress(updatedRec.pobjective);
        }
        else {
          return;
        }
    });
  });
}

// exports.getObjectivesProgress = function(req, res) {
//   const q = req.query;
//   const callback = function(err, result) {
//     console.log(err);
//     return res.send(result);
//   }

//   Objective.aggregate([
//     {$match: {
//       'owner.eid': q.eid
//     }},
//     { $unwind : "$keyresults" },
//     {$group: { 
//       _id: "$_id",
//       "name": { "$first": "$name" },
//       "krcount": { "$sum": 1 },
//       pcent: { 
//         $avg: {
//           $divide: [
//             "$keyresults.actual", "$keyresults.target"
//           ]
//         }
//       }
//     }},
//     {$project: {
//       _id: 1,
//       name : 1,
//       pcent: 1,
//       krcount: 1
//     }} 
//   ])
//   .exec(callback);
// };

  // const callback = function(err, result) {
  //   let list = '<table width="100%"><tbody>'
  //   result.map( x => (list += '<tr>' + Object.keys(x).map( y => (`<td>${x[y]}</td>`) ) + '</tr>'))
  //   list+='</tbody></table>'
  //   return res.send(list);
  // }

  // Objective.aggregate([
  //   {$match: {
  //     '_id': mongoose.Types.ObjectId(objectiveId)
  //   }},
  //   { $unwind : "$keyresults" },
  //   {$group: { 
  //     _id: "$_id",
  //     "name": { "$first": "$name" },
  //     "krcount": { "$sum": 1 },
  //     pcent: {
  //       $avg: {
  //         $divide: [
  //           "$keyresults.actual", "$keyresults.target"
  //         ]
  //       }
  //     }
  //   }},
  //   {$project: {
  //     _id: 1,
  //     name : 1,
  //     pcent: 1,
  //     krcount: 1
  //   }}
  // ]).exec(callback);
