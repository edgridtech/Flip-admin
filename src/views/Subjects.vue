<template>
  <div class="subjects">
    <div class="subject-card" v-if="adding">
        <p class="heading blue--text">
          Create subject
          <img src="../assets/close.svg" @click="adding = false" class="close" alt="">
        </p>
      <input type="text" class="main-input" placeholder="Enter subject name">

      <p class="text">
        Upload cover image
      </p>

      <div class="upload">
        <img src="../assets/camera.svg" alt="">
      </div>

      <button class="main-btn" @click="empty = adding = false">
        Add subject
      </button>
    </div>
    <div v-if="!adding && !empty" class="table">
      <button class="main-btn top-btn" @click="adding = true">
        Create subject
      </button>
      <table>
        <thead>
          <tr>
            <th>SUBJECT</th>
            <th>BANNER</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(subject) in subjects" :key="subject._id">
            <td>{{subject.name}}</td>
            <td>
              <img :src="subject.imageUrl" alt="" style="height: 40px;">
            </td>
            <td>
              <span class="blue--text">
                Edit
              </span>
              <span class="red--text">
                Delete
              </span>
            </td>
          </tr> 
        </tbody>
      </table>
    </div>

    <div class="empty" v-if="empty && !adding">
      <p>
        Seems no subject has been added yet. 
        <span>You can do so with the button below</span>
      </p>

      <button class="main-btn" @click="adding = true">
        Create subject
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  computed: {
    ...mapGetters({
      'subjects': 'getSubjects'
    }),
    empty () {
      return this.subjects.length > 0 ? false : true
    }
  },
  data () {
    return {
      adding: false
    }
  },
  methods: {
    logg () {
      console.log(this.subjects)
    }
  },
  mounted () {
    console.log(this.subjects)
  }
};
</script>
<style lang="scss" scoped>
  .subjects {
    padding: 70px 0;
    .heading {
      width: 100%;
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      margin: 5px 0 20px 0;
      .close {
        float: right;
        // margin-right: 20px;
        cursor: pointer;
      }
    }
    .subject-card {
      margin: 100px auto;
      width: 500px;
      padding: 10px 30px;
      background-color: #fff;
      height: auto;
      box-sizing: border-box;
      border-radius: 4px;
      text-align: center;
      .text {
        text-align: left
      }
      .upload {
        border: 1px dashed #112A62;
        height: 130px;
        line-height: 130px;
        text-align: center;
        border-radius: 5px;
      }
      .main-btn {
        margin: 30px 0
      }
    }

    .table {
      padding: 50px 200px;
      text-align: left;
      table {
        width: 100%;
        margin: 0 auto;
        border-collapse:collapse;
        thead {
          tr {
            border-radius: 8px 8px 0px 0px;
          }
        }
        tr {
          // border: 0;
          th {
            background-color: #112A62;
            color: #fff;
            // border: 0;
            font-size: 14px;
            font-weight: 600;
            padding: 12px 15px;
            text-align: left
          }
          td {
            background-color: #fff;
            color: #222829;
            font-size: 14px;
            padding: 12px 15px;
            text-align: left;
            border-bottom: 0.75px solid rgba(43, 72, 102, 0.05);
            span {
              padding: 0 15px;
              font-weight: 600;
              visibility: hidden
            }
          }
        }
        tbody {
          tr:hover td {
            background: rgba(17, 42, 98, 0.03);
            cursor: pointer;
            span {
              visibility: visible;
            }
          }
        }
      }
    }

    .empty {
      padding: 240px 30px;
      width: 100%;
      color: #4E5253;
      font-size: 14px;
      text-align: center;
      span {
        display: block
      }
    }
  }
</style>

