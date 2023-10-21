<template>
  <section class="section min-vh-100">
    <div class="py-4">
      <div class="container">
        <div class="title border-bottom d-flex align-items-center py-2">
          <h5>Daftar karyawan</h5>

          <div class="d-flex align-items-center ms-auto">
            <!-- /* Form input pencarian */ -->
            <input
              type="text"
              class="form-control search-input"
              placeholder="Cari Nama"
              v-model="searchQuery"
            />
            <!-- /* Drop down category */ -->
            <select
              id="akuntan"
              class="form-control category-dropdown"
              v-model="cariJabatan"
            >
              <option value="pilih">Pilih Jabatan</option>
              <option value="Office Boy">OfficeBoy</option>
              <option value="Karyawan Umum">Karyawan Umum</option>
              <option value="Administrasi">Administrasi</option>
              <option value="Akuntan">Akuntan</option>
              <option value="Manager">Manager</option>
              <option value="Sekretaris">Sekretaris</option>
              <option value="Direktur">Direktur</option>
              <option value="Wakil Direktur">Wakil Direktur</option>
              <option value="CEO">CEO</option>
              <option value="Lainnya">Lainnya</option>
            </select>

            <div
              class="d-flex align-items-center justify-content-end w-100 view-as-button"
            ></div>
          </div>
        </div>
        <transition-group
          name="karyawan"
          tag="div"
          class="d-flex gap-4 w-100 flex-wrap justify-content-center"
        >
          <CardKaryawan
            v-for="karyawan in filteredKaryawans"
            :key="karyawan.id"
            :karyawan="karyawan"
            :karyawans="karyawans"
          />
        </transition-group>

        <form v-on:submit.prevent="handleSubmit">
          <Notification :message="error" v-if="error" />
          <div class="action py-2">
            <div class="formItem" v-for="item in karyawans" :key="item.id">
              {{ item.form }}
            </div>
            <!-- /* Jika isCreating == false maka tombol Add Artikel tidak akan tampil */
/* isCreating = !isCreating berfungsi sebagai switcher toggle */ -->
            <button
              class="btn btn-primary me-2"
              v-if="!isCreating"
              @click.prevent="isCreating = !isCreating"
            >
              Tambah Karyawan
            </button>
            <div class="add-card" v-else>
              <div class="card mb-2">
                <div class="card-body d-flex flex-column p-0">
                  <input
                    v-model="form.nama"
                    class="form-control border-0 mb-2"
                    required
                    placeholder="Nama Karyawan"
                    type="text"
                  />
                  <div>
                    <p class="help is-danger" v-if="namaError">
                      {{ namaError }}
                    </p>
                  </div>
                  <input
                    v-model="form.email"
                    class="form-control border-0 mb-2"
                    required
                    placeholder="Email"
                    type="email"
                  />
                  <div>
                    <p class="help is-danger" v-if="emailError">
                      {{ emailError }}
                    </p>
                  </div>
                  <select required v-model="form.jabatan" value="feature">
                    <option disabled value="">Pilih Jabatan</option>
                    <option
                      v-for="option in options.inquiry"
                      v-bind:key="option.value"
                    >
                      {{ option.text }}
                    </option>
                  </select>
                  
                  <input
                    v-model="form.phone"
                    class="form-control border-0 mb-2"
                    required
                    placeholder="Phone Number"
                    type="text"
                  />
                  <div>
                    <p class="help is-danger" v-if="phoneError">
                      {{ phoneError }}
                    </p>
                  </div>
                  <input
                    v-model="form.tgl_lahir"
                    class="form-control border-0 mb-2"
                    required
                    placeholder="Tanggal Lahir"
                    type="text"
                    onfocus="(this.type='date')"
                    onblur="(this.type='text')"
                  />
                  <p class="help is-danger" v-if="tanggalError">
                    {{ tanggalError }}
                  </p>
                  <div class="image-upload">
                    <label for="image-upload-input">
                      <img
                        v-if="form.imageurl"
                        :src="form.imageurl"
                        alt="Preview Image"
                        class="img-preview"
                      />
                      <div v-else class="placeholder">
                        Klik Untuk Mengupload Gambar
                      </div>
                    </label>
                    <input
                      id="image-upload-input"
                      type="file"
                      accept="image/*"
                      @change="previewImage"
                    />
                  </div>
                </div>
              </div>
              <div class="button-wrapper d-flex">
                <button class="btn btn-primary me-2" type="submit">save</button>
                <button
                  class="btn btn-outline-secondary"
                  @click="isCreating = !isCreating"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import CardKaryawan from "@/components/CardKaryawan.vue";
import { mapState, mapMutations, mapActions } from "vuex";
import Notification from "~/components/Notification";

export default {
  middleware: "auth",
  components: {
    CardKaryawan,
    Notification,
  },

  data() {
    return {
      error: null,
      showErrors: false,
      // Variabel penampung berdasar kategori
      cariJabatan: "pilih",
      // Variabel penampung teks pencarian
      searchQuery: "",
      // Tipe layout daftar karyawans
      // Status saat menambahkan karyawans
      isCreating: false,
      // Daftar karyawans
      form: {
        id: "",
        nama: "",
        email: "",
        jabatan: "",
        umur: "",
        phone: "",
        tgl_lahir: "",
        imageurl: "",
      },
      options: {
        inquiry: [
          { value: "Office Boy", text: "Office Boy" },
          { value: "Karyawan Umum", text: "Karyawan Umum" },
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
      karyawans: [],
    };
  },
  computed: {
    namaError() {
      if (this.showErrors && this.form.nama.length < 3) {
        return "Nama must be at least 3 characters.";
      }
      return "";
    },
    emailError() {
      if (this.showErrors && this.form.email.length < 14) {
        return "Email must be at least 14 characters.";
      }
      return "";
    },

    phoneError() {
      if (this.showErrors) {
        if (this.form.phone.length < 10) {
          return "Phone Number must be at least 10 characters.";
        } else if (!/[0-9]/.test(this.form.phone)) {
          return "Phone Number must contain number.";
        }
      }
      return "";
    },
    tanggalError() {
      if (this.showErrors && this.form.tgl_lahir) {
        const birthDate = new Date(this.form.tgl_lahir);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDate.getFullYear();

        // Check if age is outside the desired range (20 to 100)
        if (age < 20 || age > 100) {
          return "Tanggal lahir must be between 20 and 100 years old.";
        }
      }
      return "";
    },

    //         karyawans() {
    // return this.$store.state.karyawan.karyawans;
    // },

    // ...mapState('karyawan', ['karyawans']),

    filteredKaryawans() {
      let filteredKaryawans = [...this.karyawans];

      if (this.searchQuery) {
        filteredKaryawans = filteredKaryawans.filter((item) =>
          this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.nama.toLowerCase().includes(v))
        );
      }

      if (this.cariJabatan !== "pilih") {
        filteredKaryawans = filteredKaryawans.filter(
          (karyawan) => karyawan.jabatan === this.cariJabatan
        );
      }

      return filteredKaryawans;
    },
  },

  mounted() {
    this.fetchDataFromAPI();
    // this.getKaryawans();
  },
  methods: {
    async fetchDataFromAPI() {
      //axios
      try {
        const response = await this.$axios.get("/karyawan/all"); // Replace with your API endpoint
        this.karyawans = response.data; // Assuming your API response is an array of karyawans
        console.log(response);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    },

    previewImage(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.form.imageurl = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    async handleSubmit() {
      this.showErrors = true;
      //axios

      // Validate the "tanggal lahir" field and calculate the age
      const birthDate = new Date(this.form.tgl_lahir);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthDate.getFullYear();

      if (age < 20 || age > 100) {
        return;
      }

      const isEmailExists = this.karyawans.some(
        (karyawan) => karyawan.email === this.form.email
      );
      const isPhoneExists = this.karyawans.some(
        (karyawan) => karyawan.phone === this.form.phone
      );

      if (isEmailExists) {
        this.$data.error = "Email already exists";
        return;
      } else {
        this.$data.error = "";
      }

      if (isPhoneExists) {
        this.$data.error = "Phone already exists";
        return;
      } else {
        this.$data.error = "";
      }

      if (
        this.form.nama.length >= 3 &&
        this.form.email.length >= 14 &&
        this.form.phone.length >= 10 &&
        /[0-9]/.test(this.form.phone) &&
        age >= 20 &&
        age <= 100
      ) {
        try {
          const response = await this.$axios.post("/karyawan/add", this.form); // Replace with your API endpoint
          const newItem = response.data;
          this.karyawans.push(newItem);
          // Reset the form fields after adding a karyawan
          this.form = {
            id: "",
            nama: "",
            email: "",
            jabatan: "",
            umur: "",
            phone: "",
            tgl_lahir: "",
            imageurl: "",
          };
          this.isCreating = false;
          this.showErrors = false;
        } catch (error) {
          console.error("Error creating new karyawan:", error);
        }
      }
    },

    //   async handleSubmit() { // state management

    //       this.form.id += 1
    //       // Dispatch the addKaryawan action
    //       await this.addKaryawan(this.form);

    //       this.form = {
    //       nama: '',
    //       email: '',
    //       jabatan: '',
    //       umur: '',
    //       phone:'',
    //       tgl_lahir:'',
    //       imageurl:'',
    //       }
    //       this.isCreating = false;

    //   },

    // ...mapActions('karyawan', ['addKaryawan', 'getKaryawans']),
  },
};
</script>

<style>
.section {
  background: url("static/7.webp") no-repeat;
  background-size: cover;
  background-position: center;
  padding: 100px;
}

select {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
}

select option {
  padding: 5px;
}
#app .karyawan-move {
  transition: 0.4s;
}

/* Container for search, category, and "View As" bars */
.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

/* Search input */
.search-input {
  flex-grow: 1;
  margin-right: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Category dropdown */
.category-dropdown {
  flex-basis: 70%;
  margin-right: 1rem;
}

/* Style the category dropdown options */
.category-dropdown select {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  width: 100%;
}
</style>
