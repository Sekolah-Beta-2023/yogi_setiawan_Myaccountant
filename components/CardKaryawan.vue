<template>
  <div class="card custom-card">
    <div v-if="!isEditing">
      <img
        :src="karyawan.imageurl"
        alt="Karyawan Image"
        class="card-img-top img-preview"
      />
      <div class="card-body">
        <h5 class="card-title">Kode {{ karyawan.kodekaryawan }}</h5>
        <div class="info">
          <div class="mb-1">Nama {{ karyawan.nama }}</div>
          <div class="mb-1">Jabatan {{ karyawan.jabatan }}</div>
          <div class="mb-1">Umur {{ karyawan.umur }}</div>
          <div class="mb-1">Phone {{ karyawan.phone }}</div>
          <div class="mb-1">Email {{ karyawan.email }}</div>
          <div class="mb-1">Tanggal Lahir {{ karyawan.tgl_lahir }}</div>
          <div class="description-karyawan small text-muted"></div>
        </div>
        <button @click="editKaryawan" class="btn btn-warning">Edit</button>
        <button @click="deleteKaryawan(karyawan.id)" class="btn btn-danger">
          Delete
        </button>
      </div>
    </div>

    <!-- Display edit form when in edit mode -->
    <div v-else>
      <Notification :message="error" v-if="error" />
      <div class="image-upload">
        <label for="image-upload-input">
          <img
            v-if="editedKaryawan.imageurl"
            :src="editedKaryawan.imageurl"
            alt="Preview Image"
            class="img-preview"
          />
          <div v-else class="placeholder">Klik Untuk Mengupload Gambar</div>
        </label>
        <input
          id="image-upload-input"
          type="file"
          accept="image/*"
          @change="previewImage"
        />
      </div>
      <input
        v-model="editedKaryawan.kodekaryawan"
        type="text"
        class="form-control"
      />
      <input v-model="editedKaryawan.nama" type="text" class="form-control" />
      <div>
        <p class="help is-danger" v-if="namaError">
          {{ namaError }}
        </p>
      </div>
      <select v-model="editedKaryawan.jabatan" value="feature">
        <option disabled value="">Pilih Jabatan</option>
        <option v-for="option in options.inquiry" v-bind:key="option.value">
          {{ option.text }}
        </option>
      </select>
      <input v-model="editedKaryawan.umur" type="text" class="form-control" />
      <div>
        <p class="help is-danger" v-if="umurError">
          {{ umurError }}
        </p>
      </div>
      <input v-model="editedKaryawan.phone" type="text" class="form-control" />
      <div>
        <p class="help is-danger" v-if="phoneError">
          {{ phoneError }}
        </p>
      </div>
      <input v-model="editedKaryawan.email" type="text" class="form-control" />
      <div>
        <p class="help is-danger" v-if="emailError">
          {{ emailError }}
        </p>
      </div>
      <input
        v-model="editedKaryawan.tgl_lahir"
        type="date"
        class="form-control"
      />
      <button @click="saveEdit" class="btn btn-success">Save</button>
      <button @click="cancelEdit" class="btn btn-secondary">Cancel</button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState, mapMutations, mapActions } from "vuex";
import Notification from "~/components/Notification";
export default {
  components: {
    Notification,
  },
  props: {
    karyawan: {
      type: Object,
      required: true,
      default: "Untitled",
    },
  },
  data() {
    return {
      
      error: null,
      showErrors: false,
      isEditing: false, // Track if the edit mode is active
      editedKaryawan: { ...this.karyawan },
      options: {
        inquiry: [
          { value: "OfficeBoy", text: "Office Boy" },
          { value: "KaryawanUmum", text: "Karyawan Umum" },
          { value: "Administrasi", text: "Administrasi" },
          { value: "Akuntan", text: "Akuntan" },
          { value: "Manager", text: "Manager" },
          { value: "Sekretaris", text: "Sekretaris" },
          { value: "Direktur", text: "Direktur" },
          { value: "Wakil Direktur", text: "Wakil Direktur" },
          { value: "CEO", text: "CEO" },
          { value: "Lainnya", text: "Lainnya" },
        ],
      },
    };
  },
  methods: {
    editKaryawan() {
      this.error = null;
      // Set editedKaryawan to a copy of the current karyawan
      this.editedKaryawan = { ...this.karyawan };
      // Enable edit mode
      this.isEditing = true;
    },

    async deleteKaryawan() {
      //axios
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        try {
          await this.$axios.delete(`/karyawan/delete/${this.karyawan.id}`); // Replace with your API endpoint
          this.$emit("delete-karyawan", this.karyawan);
          Swal.fire("Deleted!", "Your data has been deleted.", "success");
          window.location.reload();
        } catch (error) {
          console.error("Error deleting karyawan:", error.response);
          Swal.fire(
            "Error!",
            "An error occurred while deleting the file.",
            "error"
          );
        }
      }
    },

    //     async deleteKaryawan() { // state management
    //   const result = await Swal.fire({
    //     title: "Are you sure?",
    //     text: "You won't be able to revert this!",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Yes, delete it!",
    //   });

    //   if (result.isConfirmed) {
    //     try {
    //       // Dispatch a Vuex action to delete the item
    //       await this.$store.dispatch("karyawan/deleteKaryawan", this.karyawan.id);

    //       // The above line dispatches the "deleteKaryawan" action with the item's ID as the payload.
    //       // This action should handle both the API request and state update.

    //       Swal.fire("Deleted!", "The item has been deleted.", "success");
    //     } catch (error) {
    //       console.error("Error deleteKaryawan:", error);
    //       Swal.fire(
    //         "Error!",
    //         "An error occurred while deleting the item.",
    //         "error"
    //       );
    //     }
    //   }
    // },

    // async saveEdit() {  // state management
    //   try {
    //     // Call the Vuex action to update the edited karyawan
    //     await this.updateKaryawan(this.editedKaryawan);

    //     // After saving, disable edit mode
    //     this.isEditing = false;
    //   } catch (error) {
    //     console.error("Error saving edited karyawan:", error.response);
    //   }
    // },

    // ...mapActions('karyawan', ['updateKaryawan', 'deleteKaryawan']),

    previewImage(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editedKaryawan.imageurl = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    async saveEdit() {
      this.showErrors = true;
      this.error = null;



      //axios
      if (
        this.editedKaryawan.nama.length >= 3 &&
        this.editedKaryawan.email.length >= 14 &&
        this.editedKaryawan.phone.length >= 10 &&
        /[0-9]/.test(this.editedKaryawan.phone) &&
        /[0-9]/.test(this.editedKaryawan.umur)
      ) {
        try {
          // Send a PUT request to update the edited karyawan
          await this.$axios.put(
            `/karyawan/update/${this.editedKaryawan.id}`,
            this.editedKaryawan
          ); // Replace with your API endpoint
          // Update the original karyawan with edited values
          Object.assign(this.karyawan, this.editedKaryawan);
          // After saving, disable edit mode
          this.isEditing = false;
          this.showErrors = false;
        } catch (error) {
          console.error("Error saving edited karyawan:", error.response);
        }
      }
    },

    cancelEdit() {
      // If the user cancels the edit, revert the editedKaryawan object to the original karyawan
      this.editedKaryawan = { ...this.karyawan };
      // Disable edit mode
      this.isEditing = false;
    },
  },

  computed: {
    namaError() {
      if (this.showErrors && this.editedKaryawan.nama.length < 3) {
        return "Nama must be at least 3 characters.";
      }
      return "";
    },
    emailError() {
      if (this.showErrors && this.editedKaryawan.email.length < 14) {
        return "Email must be at least 14 characters.";
      }
      return "";
    },
    umurError() {
      if (this.showErrors && !/[0-9]/.test(this.editedKaryawan.umur)) {
        return "Umur must contain number.";
      }
      return "";
    },
    phoneError() {
      if (this.showErrors) {
        if (this.editedKaryawan.phone.length < 10) {
          return "Phone Number must be at least 10 characters.";
        } else if (!/[0-9]/.test(this.editedKaryawan.phone)) {
          return "Phone Number must contain number.";
        }
      }
      return "";
    },
    // karyawans() {
    //       return this.$store.state.karyawan.karyawans;
    //       },
    //       ...mapState('karyawan', ['karyawans']),
  },
};
</script>
<style scoped>
.custom-card {
  width: 18rem;
}

.info {
  margin-bottom: 1rem;
}
.img-preview {
  width: 100%;
  height: 200px;
}
</style>
