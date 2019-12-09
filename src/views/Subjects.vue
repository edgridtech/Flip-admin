<template>
  <div class="subjects">
    <div class="subject-card" v-if="adding">
      <p class="heading blue--text">
        Create subject
        <img src="../assets/close.svg" @click="openAdd()" class="close" alt>
      </p>
      <input type="text" class="main-input" v-model="name" placeholder="Enter subject name">

      <p class="text">Upload cover image</p>

      <div class="upload" :style="{'background-image': `url(${imageUrl})` }">
        <img src="../assets/camera.svg" alt>
        <input type="file" @change="uploadImage($event)">
      </div>

      <button class="main-btn" v-if="isEditting" @click="editSubject()" :disabled="imageUrl === ''">
        <span>Edit</span>
      </button>

      <button class="main-btn" v-else @click="saveSubject()" :disabled="imageUrl === ''">
        <span>Add subject</span>
      </button>
    </div>
    <div v-if="!adding && !empty" class="table">
      <button class="main-btn top-btn" @click="adding = true">Create subject</button>
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
              <img :src="subject.imageUrl" alt style="height: 40px;">
            </td>
            <td>
              <span class="blue--text" @click="setEdit(subject)">Edit</span>
              <span class="red--text" @click="deleteSubject(subject._id)">Delete</span>
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

      <button class="main-btn" @click="adding = true">Create subject</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import services from '../services';
export default {
  name: 'home',
  computed: {
    ...mapGetters({
      'subjects': 'getSubjects'
    }),
    empty () {
      return this.subjects.length > 0 ? false : true
    },
    img () {
      this.imageUrl === '' ? '../assets/camera.svg' : this.imageUrl
    }
  },
  data () {
    return {
      adding: false,
      file: null,
      id: '',
      name: '',
      imageUrl: '',
      isEditting: false
    }
  },
  methods: {
    logg () {
      console.log(this.subjects)
    },
    uploadImage (e) {
      let file = e.target.files[0]
      services.uploadImage(file)
      .then(res => {
        console.log(res)
        this.imageUrl = res.data.data
      })
      .catch(err => {
        console.log({err})
      })
    },
    openAdd () {
      this.adding = this.isEditting = false
      this.imageUrl = ''
      this.name = ''
    },
    setEdit (e) {
      this.adding = true
      this.imageUrl = e.imageUrl
      this.name = e.name 
      this.isEditting = true
      this.id = e._id
    },
    deleteSubject (id) {
      services.deleteSubject({id})
      .then(res => {
        console.log(res)
        this.empty = this.adding = false
        services.getSubjects()
      })
      .catch(err => {
        console.log({err})
      })
    },
    editSubject () {
      let data = {
        imageUrl: this.imageUrl,
        name: this.name,
        id: this.id
      }
      services.editSubject(data)
      .then(res => {
        console.log(res)
        this.empty = this.adding = false
        services.getSubjects()
      })
      .catch(err => {
        console.log({err})
      })
    },
    saveSubject () {
      let data = {
        imageUrl: this.imageUrl,
        name: this.name
      }
      services.addSubject(data)
      .then(res => {
        console.log(res)
        this.empty = this.adding = false
        services.getSubjects()
      })
      .catch(err => {
        console.log({err})
      })
    },
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
      text-align: left;
    }
    .upload {
      border: 1px dashed #112a62;
      height: 200px;
      line-height: 200px;
      text-align: center;
      border-radius: 5px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
      input {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        left: 0;
        cursor: pointer;
      }
    }
    .main-btn {
      margin: 30px 0;
    }
  }

  .table {
    padding: 50px 200px;
    text-align: left;
    table {
      width: 100%;
      margin: 0 auto;
      border-collapse: collapse;
      thead {
        tr {
          border-radius: 8px 8px 0px 0px;
        }
      }
      tr {
        // border: 0;
        th {
          background-color: #112a62;
          color: #fff;
          // border: 0;
          font-size: 14px;
          font-weight: 600;
          padding: 12px 15px;
          text-align: left;
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
  }

  .empty {
    padding: 240px 30px;
    width: 100%;
    color: #4e5253;
    font-size: 14px;
    text-align: center;
    span {
      display: block;
    }
  }
}
</style>

