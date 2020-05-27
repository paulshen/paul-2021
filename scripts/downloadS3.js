require("dotenv").config()
const s3 = require("s3")
const path = require("path")

var client = s3.createClient({
  maxAsyncS3: 20, // this is the default
  s3RetryCount: 3, // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
    // endpoint: 's3.yourdomain.com',
    // sslEnabled: false
    // any other options are passed to new AWS.S3()
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  },
})

const assetsDirectory = `${path.dirname(__dirname)}/s3`
client.downloadDir({
  localDir: `${assetsDirectory}/draw`,
  s3Params: {
    Prefix: "draw/",
    Bucket: "s3.bypaulshen.com",
  },
})
client.downloadDir({
  localDir: `${assetsDirectory}/photos`,
  s3Params: {
    Prefix: "photos/",
    Bucket: "s3.bypaulshen.com",
  },
})
