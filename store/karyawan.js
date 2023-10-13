import Swal from "sweetalert2";
export const state = () => ({
    karyawans: [
    ], // Initialize with an empty array for storing karyawan data
  });
  
  export const mutations = {
    setKaryawans(state, karyawans) {
      state.karyawans = karyawans;
    },
    addKaryawan(state, karyawan) {
      state.karyawans.push(karyawan);
    },
    deleteKaryawan(state, karyawanId) {
      state.karyawans = state.karyawans.filter((karyawan) => karyawan.id !== karyawanId);
    },
    updateKaryawan(state, updatedKaryawan) {
      const index = state.karyawans.findIndex((karyawan) => karyawan.id === updatedKaryawan.id);
      if (index !== -1) {
        state.karyawans.splice(index, 1, updatedKaryawan);
      }
    },
  };
  
  export const actions = {
    async getKaryawans({ commit }) {
      // Fetch data from the API or any other data source
      // For example, you can use axios here
      try {
        const response = await this.$axios.get("/karyawan/all");
        commit("setKaryawans", response.data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    },
  
    async addKaryawan({ commit }, karyawan) {
      // Send a POST request to add a new karyawan and get the created item
      try {
        const response = await this.$axios.post("/karyawan/add", karyawan);
        const newItem = response.data;
        commit("addKaryawan", newItem);
        return newItem; // Return the new item if needed
      } catch (error) {
        console.error("Error creating new karyawan:", error);
      }
    },
  
    async deleteKaryawan({ commit }, karyawanId) {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              // Send a DELETE request to remove a karyawan
              await this.$axios.delete(`/karyawan/delete/${karyawanId}`);
              commit("deleteKaryawan", karyawanId);
            } catch (error) {
              console.error("Error deleting karyawan:", error);
            }
          }
        });
      },
  
    async updateKaryawan({ commit }, updatedKaryawan) {
      // Send a PUT request to update a karyawan
      try {
        await this.$axios.put(`/karyawan/update/${updatedKaryawan.id}`, updatedKaryawan);
        commit("updateKaryawan", updatedKaryawan);
      } catch (error) {
        console.error("Error updating karyawan:", error);
      }
    },
  };
  
  export const getters = {
    getKaryawans: (state) => state.karyawans,
    getKaryawanById: (state) => (id) => {
      console.log("karyawan: ", id);
      return state.karyawans.find(karyawan => karyawan.id == id)
      },
  };