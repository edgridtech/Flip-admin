<template>
  <div id="app">
    <div id="nav" v-if="!onLogin">
      <img src="./assets/flip-logo.svg" alt class="logo">
      <div
        v-for="(link, i) in links"
        @click="to(link.to)"
        :key="'link'+i"
        :class="link.state+' link'"
      >{{link.text}}</div>
    </div>
    <router-view class="views"/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      links: [
        {
          text: 'Subjects',
          to: '/subjects',
          state: 'active-link'
        },
        {
          text: 'Flips',
          to: '/flips',
          state: ''
        }
      ],
      onLogin: true
    }
  },
  computed: {
    on () {
      return this.$route.path
    }
  },
  watch: {
    on () {
      console.log(this.onLogin)
      this.on === '/' ? this.onLogin = true : this.onLogin = false
    }
  },
  mounted () {
    this.on === '/' ? this.onLogin = true : this.onLogin = false
  },
  methods: {
    to (to) {
      this.links = this.links.map(link => {
        return link.to === to ? {...link, state: 'active-link'} : {...link, state: ''}
      })
      if (this.$route.path !== to) this.$router.push(to)
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  height: 50px;
  line-height: 50px;
  position: absolute;
  left: 0px;
  top: 0px;
  background: #ffffff;
  padding: 0px 30px;
  width: 100%;
  .logo {
    position: relative;
    left: 0;
    float: left;
    margin-top: 10px;
    // height: 40px;
  }
  .link {
    font-weight: bold;
    color: #909394;
    display: inline-block;
    padding: 0 12px;
    height: 100%;
    cursor: pointer;
  }
  .active-link {
    color: #112a62;
    font-weight: 600;
    border-bottom: 3px solid #54c270;
  }
}
.views {
  background-color: #fafafa;
  min-height: 100vh;
}

// general styles
.blue--text {
  color: #112a62;
}
.green-text {
  color: #54c270;
}
.red--text {
  color: #fc575e;
}
button:disabled,
button[disabled] {
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
}
.main-btn {
  background-color: #54c270;
  color: #ffffff;
  font-size: 15px;
  border: 0;
  padding: 15px 45px;
  border-radius: 50px;
  margin: 10px 0;
}
.sec-btn {
  background-color: #fff;
  color: #112a62;
  font-size: 15px;
  border: 0;
  border: 1px solid rgba(43, 72, 102, 0.25);
  padding: 15px 45px;
  border-radius: 50px;
  margin: 10px 0;
}
label {
  display: block;
}
button,
input,
select,
textarea {
  &:focus {
    outline: none;
  }
}
.main-input {
  border: 1px solid #dbe6ec;
  // box-sizing: border-box;
  border-radius: 50px;
  height: 50px;
  width: 100%;
  margin: 10px 0;
  font-size: 12px;
  padding: 0 12px;
}
.main-area {
  border: 1px solid #dbe6ec;
  // box-sizing: border-box;
  border-radius: 10px;
  height: 200px;
  width: 100%;
  margin: 10px 0;
  font-size: 12px;
  padding: 12px;
}
.sec-inp {
  border: 1px solid #dbe6ec;
  box-sizing: border-box;
  border-radius: 50px;
  height: 30px;
  margin: 10px 0;
  padding: 0 12px;
}

button {
  cursor: pointer;
}

input:focus,
button:focus {
  outline: none;
}

.quillWrapper {
  height: 75vh !important;
}

// responsive ish
.row {
  [class*="col-"] {
    float: left;
    padding: 15px;
  }
  .col-1 {
    width: 8.33%;
  }
  .col-2 {
    width: 16.66%;
  }
  .col-3 {
    width: 25%;
  }
  .col-4 {
    width: 33.33%;
  }
  .col-5 {
    width: 41.66%;
  }
  .col-6 {
    width: 50%;
  }
  .col-7 {
    width: 58.33%;
  }
  .col-8 {
    width: 66.66%;
  }
  .col-9 {
    width: 75%;
  }
  .col-10 {
    width: 83.33%;
  }
  .col-11 {
    width: 91.66%;
  }
  .col-12 {
    width: 100%;
  }
}
.row::after {
  content: "";
  clear: both;
  display: table;
}

@media (max-width: 767px) {
  .col-1,
  .col-2,
  .col-3,
  .col-4,
  .col-5,
  .col-6,
  .col-7,
  .col-8,
  .col-9,
  .col-10,
  .col-11,
  .col-12 {
    width: 100%;
  }
}
</style>
