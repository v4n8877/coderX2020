
const shortid = require('shortid');
const db = require('../db');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'v4n8877',
  api_key: '791223667666661',
  api_secret: 'tryp7Qm615EpbJf6IiqhkbZQXSE'
});

module.exports.index =  (req, res) => {
  res.render('users', {
    users: db.get('users').value()
  });
};

module.exports.toCreate = (req, res) => {
  res.render('createUser');
}

module.exports.createUser = (req, res) => {
  req.body.id = shortid.generate();
  const uploadImage = (avatar) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(avatar, function(error, result) { 
        if (error) return reject(error);
        return resolve(result);
      });
    })
  }

  const pushImageData = async () => {
    try{
       let image = await uploadImage(req.file.path);
       req.body.avatar = req.file.path.split('/').slice(1).join('/');
       req.body.avatarUrl = image.url;
       db.get('users').push(req.body).write();
      res.redirect('/users');
    }
    catch(err){ console.log(err)}
 }
 pushImageData();
};

module.exports.idUpdate = (req, res) => {
  const userId = req.params.userId;
  const user = db.get('users').filter((user) => {
    return user.id === userId;
  }).value();
  res.render('updateUser', {
    user: user[0]
  });
};

module.exports.updateUser = (req, res) => {
  req.body.avatar = req.file.path.split('/').slice(1).join('/');

  const uploadImage = (avatar) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(avatar, function(error, result) { 
        if (error) return reject(error);
        return resolve(result);
      });
    })
  }

  const pushImageData = async () => {
    try{
       let image = await uploadImage(req.file.path);
       db.get('users')
        .find({ id: req.body.id })
        .assign({ 
          name: req.body.name, 
          email: req.body.email,
          avatar: req.body.avatar,
          avatarUrl: image.url
        }).write();
      res.redirect('/users');
    }
    catch(err){ console.log(err)}
 }
 pushImageData();
};

module.exports.deleteUser = (req, res) => {
  const userId = req.params.userId;
  db.get('users').remove({ id: userId }).write();
  res.redirect('/users');
};