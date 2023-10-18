<template>
  <div class="card custom-card">
    <div v-if="!isEditing">
      <img
        :src="barang.imageurl"
        alt="Barang Image"
        class="img-preview barang-image"
      />
      <div class="card-body">
        <h5 class="card-title">{{ barang.kodebarang }}</h5>
        <div class="info">
          <div class="mb-1 nama-barang">Nama {{ barang.namabarang }}</div>
          <div class="mb-1 jenis-barang">Jenis {{ barang.jenisbarang }}</div>
          <div class="mb-1 jumlah-barang">Jumlah {{ barang.jumlahbarang }}</div>
          <div class="mb-1 harga-barang">
            Harga {{ formatPrice(barang.hargabarang) }}
          </div>
          <div class="mb-1 tglmasuk">Tanggal Masuk {{ barang.tglmasuk }}</div>
          <div class="description-barang small text-muted"></div>
        </div>
        <button @click="editBarang" class="btn btn-warning">Edit</button>
        <button @click="deleteBarang(barang.id)" class="btn btn-danger">
          Delete
        </button>
      </div>
    </div>

    <!-- Display edit form when in edit mode -->
    <div v-else>
      <div class="image-upload">
        <label for="image-upload-input">
          <img
            v-if="editedBarang.imageurl"
            :src="editedBarang.imageurl"
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
        v-model="editedBarang.kodebarang"
        type="text"
        class="form-control"
      />
      <input
        v-model="editedBarang.namabarang"
        type="text"
        class="form-control"
      />
      <div>
        <p class="help is-danger" v-if="namaError">
          {{ namaError }}
        </p>
      </div>
      <select v-model="editedBarang.jenisbarang" value="feature">
        <option disabled value="">Pilih Jenis Barang</option>
        <option v-for="option in options.inquiry" v-bind:key="option.value">
          {{ option.text }}
        </option>
      </select>
      <input
        v-model="editedBarang.jumlahbarang"
        type="text"
        class="form-control"
      />
      <div>
        <p class="help is-danger" v-if="jumlahError">
          {{ jumlahError }}
        </p>
      </div>
      <input
        v-model="editedBarang.hargabarang"
        type="text"
        class="form-control"
      />
      <div>
        <p class="help is-danger" v-if="hargaError">
          {{ hargaError }}
        </p>
      </div>
      <input v-model="editedBarang.tglmasuk" type="date" class="form-control" />
      <button @click="saveEdit" class="btn btn-success">Save</button>
      <button @click="cancelEdit" class="btn btn-secondary">Cancel</button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  props: {
    barang: {
      type: Object,
      required: true,
      default: "Untitled",
    },
  },
  data() {
    return {
      showErrors : false,
      isEditing: false, // Track if the edit mode is active
      editedBarang: { ...this.barang }, // Initialize editedBarang with the current barang
      options: {
        inquiry: [
          { value: "Laptop", text: "Laptop" },
          { value: "PC", text: "PC" },
          { value: "Monitor", text: "Monitor" },
          { value: "Mobil", text: "Mobil" },
          { value: "Motor", text: "Motor" },
          { value: "Lainnya", text: "Lainnya" },
        ],
      },
    };
  },
  computed: {
    hargaError(){
      if (this.showErrors) {
        if (this.editedBarang.hargabarang.length < 4) {
          return "Harga Barang must be at least 4 characters.";
        } else if (
          !/[0-9]/.test(this.editedBarang.hargabarang)
        ) {
          return "Harga Barang must contain number.";
        }
      }
      return "";
      },
      namaError(){
      if(this.showErrors && this.editedBarang.namabarang.length < 4){
          return "Nama Barang must be at least 4 characters.";
        } return "";
      },
      jumlahError(){
      if(this.showErrors && !/[0-9]/.test(this.editedBarang.jumlahbarang)){
          return "Jumlah barang must contain number.";
        } return "";  
      },

    // barangs() {
    //   return this.$store.state.barang.barangs;
    // },
    // ...mapState("barang", ["barangs"]),
  },
  methods: {
    formatPrice(num) {
      const reverse = num.toString().split("").reverse().join("");
      let result = reverse.match(/\d{1,3}/g);
      result = result.join(".").split("").reverse().join("");
      return result;
    },

    editBarang() {
      // Set editedBarang to a copy of the current barang
      this.editedBarang = { ...this.barang };
      // Enable edit mode
      this.isEditing = true;
    },

    async deleteBarang(id) {
      // axios
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
          await this.$axios.delete(`/barang/delete/${id}`); // Replace with your API endpoint
          this.$emit("delete-barang", this.barang);
          Swal.fire("Deleted!", "The item has been deleted.", "success");
          window.location.reload();
        } catch (error) {
          console.error("Error deleting barang:", error.response);
          Swal.fire(
            "Error!",
            "An error occurred while deleting the item.",
            "error"
          );
        }
      }
    },

    // async deleteBarang() {

    // await this.$store.dispatch("barang/deleteBarang", this.barang.id);

    // },

    previewImage(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editedBarang.imageurl = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    async saveEdit() {
      this.showErrors = true;
      //axios
      if(this.editedBarang.hargabarang.length >= 4 && this.editedBarang.namabarang.length >= 4 && /[0-9]/.test(this.editedBarang.jumlahbarang) && /[0-9]/.test(this.editedBarang.hargabarang)){
      try {
        // Send a PUT request to update the edited barang
        await this.$axios.put(
          `/barang/update/${this.editedBarang.id}`,
          this.editedBarang
        ); // Replace with your API endpoint
        // Update the original barang with edited values
        Object.assign(this.barang, this.editedBarang);
        // After saving, disable edit mode
        this.isEditing = false;
        this.showErrors = false;
      } catch (error) {
        console.error("Error saving edited barang:", error.response);
      }
      }
    },

    // async saveEdit() {
    //   // state management
    //   try {
    //     // Call the Vuex action to update the edited barang
    //     await this.updateBarang(this.editedBarang);

    //     // After saving, disable edit mode
    //     this.isEditing = false;
    //   } catch (error) {
    //     console.error("Error saving edited barang:", error.response);
    //   }
    // },

    cancelEdit() {
      // If the user cancels the edit, revert the editedBarang object to the original barang
      this.editedBarang = { ...this.barang };
      // Disable edit mode
      this.isEditing = false;
    },
    // ...mapActions("barang", ["updateBarang", "deleteBarang"]),
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

.nama-barang,
.jenis-barang,
.jumlah-barang,
.harga-barang,
.tglmasuk {
  margin-bottom: 1rem;
}

.img-preview {
  width: 100%;
  height: 200px;
}
</style>
