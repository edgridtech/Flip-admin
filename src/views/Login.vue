<template>
    <div class="login">
        <div class="nav">
            <img src="../assets/flip-logo.svg" alt="">
        </div>
        <div class="login-content">
            <div class="login-card">
                <p class="welcome blue--text">
                    Welcome
                </p>
                <p class="welcome-text">
                    This is where the magic happens! Log in with your admin credentials to proceed
                </p>

                <input type="tel" class="main-input" v-model="phone">
                <input class="main-input" v-model="password" type="password">
                <button class="main-btn" @click="login()">
                    Login
                </button>
                <p class="contact">
                    Don’t have credentials? <span class="blue--text">Contact the engineering team</span>
                </p>
            </div>
        </div>
    </div>    
</template>
<script>
import services from '../services'
export default {
  data () {
    return {
      phone: '',
      password: '',
      loading: false
    }
  },
  methods: {
    login () {
      const {phone, password} = this
      let data = {
        phone,
        password
      }
      this.loading = true
      services.login(data)
      .then(res => {
        this.loading = false
        window.sessionStorage.setItem('token', res.data.token)

        services.getFlips()
        .then(flips => {
          this.$store.commit('saveFlips', flips.data.flips)
        })

        services.getSubjects()
        .then(subjects => {
          this.$store.commit('saveSubjects', subjects.data.subjects)
        })
        this.$router.push('/subjects')
      })
      .catch(err => {
        console.log(err)
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
    .login {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        .nav {
            text-align: center;
            height: 50px;
            line-height: 60px;
            background-color: #ffffff;
            img {
                height: 40px;
                vertical-align: middle
            }
        }
        .login-content {
            .login-card {
                margin: 100px auto;
                width: 400px;
                padding: 30px;
                height: auto;
                border: 0.5px solid #e2e2e2;
                box-sizing: border-box;
                border-radius: 4px;
                text-align: center;
                .welcome {
                    font-size: 20px;
                    font-weight: 600;
                }
                .welcome-text {
                    color: #4E5253;
                    font-size: 14px;
                }
                .contact {
                    span {
                        font-weight: 600
                    }
                }
            }
        }
    }
</style>
