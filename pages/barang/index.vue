<template>
<section class="section min-vh-100">
  <div class="py-4">
    <div class="container">
      <div class="title border-bottom d-flex align-items-center py-2">
        <h5>Inventaris</h5>

        <div class="d-flex align-items-center ms-auto">
          <!-- /* Form input pencarian */ -->
          <input
            type="text"
            class="form-control search-input"
            placeholder="Cari Nama Barang"
            v-model="searchQuery"
          />
          <!-- /* Drop down category */ -->
          <select
            id="akuntan"
            class="form-control category-dropdown"
            v-model="cariJenis"
          >
            <option value="pilih">Pilih Jenis Barang</option>
            <option value="Laptop">Laptop</option>
            <option value="PC">PC</option>
            <option value="Monitor">Monitor</option>
            <option value="Mobil">Mobil</option>
            <option value="Motor">Motor</option>
            <option value="Lainnya">Lainnya</option>
          </select>

          <div
            class="d-flex align-items-center justify-content-end w-100 view-as-button"
          >
          </div>
        </div>
      </div>
<transition-group name="barang" tag="div" class="d-flex gap-4 w-100 flex-wrap justify-content-center">
  <CardBarang v-for="barang in filteredBarangs" :key="barang.id" :barang="barang" />
</transition-group>

      <form v-on:submit.prevent="handleSubmit">
        <div class="action py-2">
          <div class="formItem" v-for="item in barangs" :key="item.id">
            {{ item.form }}
          </div>
          <!-- /* Jika isCreating == false maka tombol Add Artikel tidak akan tampil */
/* isCreating = !isCreating berfungsi sebagai switcher toggle */ -->
          <a
            href="#"
            class="add-button"
            v-if="!isCreating"
            @click.prevent="isCreating = !isCreating"
            >Tambah Barang</a
          >
          <div class="add-card" v-else>
            <div class="card mb-2">
              <div class="card-body d-flex flex-column p-0">
                <input
                  v-model="form.namabarang"
                  class="form-control border-0 mb-2"
                  placeholder="Nama Barang"
                  type="text"
                />
                <select v-model="form.jenisbarang" value="feature">
                  <option disabled value="">Pilih Jenis Barang</option>
                  <option
                    v-for="option in options.inquiry"
                    v-bind:key="option.value"
                  >
                    {{ option.text }}
                  </option>
                </select>
                <input
                  v-model="form.jumlahbarang"
                  class="form-control border-0 mb-2"
                  placeholder="Jumlah Barang"
                  type="text"
                />
                <input
                  v-model="form.hargabarang"
                  class="form-control border-0 mb-2"
                  placeholder="harga Barang"
                  type="text"
                />
                <input
                  v-model="form.tglmasuk"
                  class="form-control border-0 mb-2"
                  placeholder="Tanggal Masuk"
                  type="date"
                />
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
import CardBarang from "@/components/CardBarang.vue";
import { mapState, mapMutations, mapActions } from "vuex"
export default {
middleware: 'auth',  
  components: {
    CardBarang,
  },

  data() {
    return {
      // Variabel penampung berdasar kategori
      cariJenis: "pilih",
      // Variabel penampung teks pencarian
      searchQuery: "",
      // Tipe layout daftar barangs
      // Status saat menambahkan barangs
      isCreating: false,
      // Daftar barangs
      form: {
        id: "",
        namabarang: "",
        jenisbarang: "",
        jumlahbarang: "",
        hargabarang: "",
        tglmasuk: "",
        imageurl: "",
      },
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
      barangs() {
        return this.$store.state.barang.barangs;
        },

        ...mapState('barang', ['barangs']),

    filteredBarangs() {
      let filteredBarangs = [...this.barangs];

      if (this.searchQuery) {
        filteredBarangs = filteredBarangs.filter((item) =>
          this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.namabarang.toLowerCase().includes(v))
        );
      }

      if (this.cariJenis !== "pilih") {
        filteredBarangs = filteredBarangs.filter(
          (barang) => barang.jenisbarang === this.cariJenis
        );
      }

      return filteredBarangs;
    },
  },

  mounted() {
    // this.fetchDataFromAPI();
    this.getBarangs();
  },

  methods: {
    // async fetchDataFromAPI() { //axios
    //   try {
    //     const response = await this.$axios.get("/barang/all"); // Replace with your API endpoint
    //     this.barangs = response.data; // Assuming your API response is an array of barangs
    //     console.log(response);
    //   } catch (error) {
    //     console.error("Error fetching data from API:", error);
    //   }
    // },

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

    // async handleSubmit() { //axios
    //   try {
    //     const response = await this.$axios.post("/barang/add", this.form); // Replace with your API endpoint
    //     const newItem = response.data;
    //     this.barangs.push(newItem);
    //     // Reset the form fields after adding a barang
    //     this.form = {
    //       id: "",
    //       namabarang: "",
    //       jenisbarang: "",
    //       jumlahbarang: "",
    //       hargabarang: "",
    //       tglmasuk: "",
    //       imageurl: "",
    //     };
    //     this.isCreating = false;
    //   } catch (error) {
    //     console.error("Error creating new barang:", error);
    //   }
    // },
           async handleSubmit() { // state management

            this.form.id += 1
            // Dispatch the addBarang action
            await this.addBarang(this.form);

            this.form = {
            namabarang: '',
            jenisbarang: '',
            jumlahbarang: '',
            hargabarang: '',
            tglmasuk:'',
            imageurl:'',
            }
            this.isCreating = false;

        },
        ...mapActions('barang', ['addBarang', 'getBarangs']),


  },
};
</script>

<style>
select {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
}

select option {
  padding: 5px;
}
#app .barang-move {
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

.section{
    background:  url('static/8.webp') no-repeat;
    background-size: cover;
    background-position: center;
    
}
</style>