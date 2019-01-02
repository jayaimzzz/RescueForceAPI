const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const bucket = 'rescue-force-dev-1-00112233';

aws.config.update({
    secretAccessKey,
    accessKeyId,
    region: 'us-east-1'
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket,
        key: function(req, file, cb) {
            console.log(file);
            cb(null, Date.now().toString());
        }
    })
});

