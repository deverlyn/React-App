var AWS = require('aws-sdk');

export default function DynamoGet(email) {
  var dynamodb = new AWS.DynamoDB({
    region: STRINGS.region,
    accessKeyId: STRINGS.accessKeyId,
    secretAccessKey: STRINGS.secretAccessKey,
  });
  //pega dado da tabela
  dynamodb.getItem(
    {
      Key: {
        user_email: {
          S: email,
        },
      },
      TableName: 'tbl_users_reactapp',
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        return data;
      }
    },
  );
  return email;
}
