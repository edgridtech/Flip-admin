<template>
  <div class="flips">
    <div  v-if="!adding && !empty">
      <button class="main-btn top-btn" @click="adding = true">
        Create flip
      </button>
      <div class="sorts">
        Sort by: 
        <select name="" id="" class="sec-inp" v-model="filterSubject" @change="filterLevel = filterType = ''">
          <option v-for="option in subjectOptions" :value="option.value" :key="option.text">{{option.text}}</option>
        </select>
        <select name="" id="" class="sec-inp" v-model="filterLevel">
          <option v-for="option in levelOptions" :value="option.value" :key="option.text">{{option.text}}</option>
        </select>
        <select name="" id="" class="sec-inp" v-model="filterType">
          <option v-for="option in typeOptions" :value="option.value" :key="option.text">{{option.text}}</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>TITLE</th>
            <th>LEVEL</th>
            <th>SUBJECT</th>
            <th>STATUS</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-if="filteredFlips.length > 0">
          <tr v-for="flip in filteredFlips" :key="flip.title">
            <td>
              {{flip.title}}
            </td>
            <td>
              {{flip.level}}
            </td>
            <td>
              {{flip.subject}}
            </td>
            <td>
              published
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
        <tbody v-else>
          <tr>
            <td colspan="5">
              There are no flips here.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="adding">
      <div class="form-wrap row">
        <p class="heading blue--text">
          Create flip
          <img src="../assets/close.svg" @click="adding = false" class="close" alt="">
        </p>
        <div class="col-6 left">
          <select name="" id="" class="main-input"></select>
          <select name="" id="" class="main-input"></select>
          <input type="text" class="main-input">
          <input type="text" class="main-input">
          <input type="text" class="main-input">

          <p class="text">
            Upload cover image
          </p>

          <div class="upload">
            <img src="../assets/camera.svg" alt="">
          </div>
          <div class="types">
            <span class="type type1 selected">
              Free
            </span>
            <span class="type type2">
              Premium
            </span>
          </div>
          <div class="buttons">
            <button class="main-btn">
              Publish
            </button>
            <button class="sec-btn">
              Save draft
            </button>
          </div>
        </div>
        <div class="col-6 right">    
          <vue-editor v-model="content"></vue-editor>
        </div>
      </div>
    </div>

    <div class="empty" v-if="empty && !adding">
      <p>
        Seems no subject has been added yet. 
        <span>You can do so with the button below</span>
      </p>

      <button class="main-btn" @click="adding = true">
        Create flip
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  computed: {
    ...mapGetters({
      'flips': 'getFlips',
      'subjects': 'getSubjects'
    }),
    subjectOptions () {
      return this.subjects.map(sub => {
        return {
          text: sub.name,
          value: sub.name
        }
      })
    },
    filteredFlips () {
      return this.filterSubject === '' ? this.flips[0].flips : 
      this.flips.find(flipBundle =>  flipBundle.subject === this.filterSubject).flips
      .filter(flip => {
        return this.filterType === '' ? flip.level.toLowerCase().includes(this.filterLevel) :
        flip.level.toLowerCase().includes(this.filterLevel) && flip.paid === this.filterType
      })
    }
  },
  data () {
    return {
      adding: false,
      empty: false,
      filterSubject: '',
      filterLevel: '',
      filterType: '',
      content: "<p>start typing...</p>",
      levelOptions: [
        {
          text: 'all',
          value: ''
        },
        {
          text: 'beginner',
          value: 'beginner'
        },
        {
          text: 'intermediate',
          value: 'intermediate'
        },
        {
          text: 'advanced',
          value: 'advanced'
        },
      ],
      typeOptions: [
        {
          text: 'all',
          value: ''
        },
        {
          text: 'free',
          value: false
        },
      
        {
          text: 'premium',
          value: true
        }
      ]
    }
  },
  methods: {
  },
  mounted () {
    this.filterSubject = this.flips[0].subject
  },
}
</script>
<style lang="scss" scoped>
  .flips {
    padding: 100px;
    text-align: left;
    .sorts {
      text-align: left;
      width: 100%;
      padding: 20px 0;
      margin: 0 auto;
      select {
        width: 200px;
        margin: 0 5px;
      }
    }
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
            visibility: hidden;
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
    .form-wrap {
      width: 100%;
      background-color: #fff;
      border-radius: 10px;
      padding: 15px;
      .heading {
        width: 100%;
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        margin: 5px 0;
        .close {
          float: right;
          margin-right: 20px;
          cursor: pointer;
        }
      }
      .left {
        .upload {
          border: 1px dashed #112A62;
          height: 100px;
          line-height: 100px;
          text-align: center;
          border-radius: 5px;
        }
        .types {
          width: 100%;
          padding: 20px 0;
          .type {
            min-width: 50%;
            display: inline-block;
            padding: 12px 30px;
            border: 1px solid #DBE6EC;
            box-sizing: border-box
          }
          .type.selected {
            background-color: #112A62;
            color: #fff;
          }
          .type1 {
            border-radius: 50px 0px 0px 50px;
          }
          .type2 {
            border-radius: 0 50px 50px 0;
          }
        }
        .buttons {
          text-align: center;
          padding-top: 15px;
          button {
            margin: 0 5px
          }
        }
      }
      .right {
        min-height: 70vh
      }
    }
    .empty {
      padding: 200px 30px;
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

