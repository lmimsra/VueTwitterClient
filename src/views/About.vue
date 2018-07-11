<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
  import Twitter from 'twitter'

  var client = new Twitter({
      consumer_key: 'oWeRDDxHH86txvuM2rPwTFRW1',
      consumer_secret: 'w1YjC2cIzflnasYhKlwFhdJbesPeDSulvkeJzSTYiaqRu9bXNk',
      access_token_key: '1285788504-A0fpn28fTCxtk4YNh2ZVfv9yUD6f11KPIX2xQt7',
      access_token_secret: 'bw6rh9pki5Fu0CkgWz3dcrQpnEyKPBT8oFvlXlFE3kG9X'
  });
  var params = {screen_name: 'nodejs'};

  client.get('statuses/user_timeline', params, function(error, tweets, response){
      if (!error) {
          console.log(tweets);
      }
  });

  export default {
      name: 'about',

  }
</script>
