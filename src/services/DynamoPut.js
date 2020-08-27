var AWS = require('aws-sdk');

export default function DynamoPut(email) {
  var dynamodb = new AWS.DynamoDB({
    region: STRINGS.region,
    accessKeyId: STRINGS.accessKeyId,
    secretAccessKey: STRINGS.secretAccessKey,
  });
  dynamodb.putItem(
    {
      TableName: 'tbl_users_reactapp',
      Item: {
        user_email: {S: email},
        user_name: {S: nome},
        user_password: {S: senha},
      },
    },
    (err, data) => {
      if (err) {
        console.log(err);
        Alert.alert(null, 'erro ' + toString(err));
      } else {
        return data;
      }
    },
  );
  return email;
}
