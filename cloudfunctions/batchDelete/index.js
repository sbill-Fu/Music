const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    await db.collection('user').where({
      name: 'jerry'
    }).remove();
  } catch(e) {
    console.error(e);
  }
}
