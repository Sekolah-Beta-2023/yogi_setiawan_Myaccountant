import Swal from "sweetalert2";

export const state = () => ({
    barangs: [
    ], // Initialize with an empty array for storing barang data
  });
  
  export const mutations = {
    setBarangs(state, barangs) {
      state.barangs = barangs;
    },
    addBarang(state, barang) {
      state.barangs.push(barang);
    },
    deleteBarang(state, barangId) {
      state.barangs = state.barangs.filter((barang) => barang.id !== barangId);
    },
    updateBarang(state, updatedBarang) {
      const index = state.barangs.findIndex((barang) => barang.id === updatedBarang.id);
      if (index !== -1) {
        state.barangs.splice(index, 1, updatedBarang);
      }
    },
  };
  
  export const actions = {
    async getBarangs({ commit }) {
      // Fetch data from the API or any other data source
      // For example, you can use axios here
      try {
        const response = await this.$axios.get("/barang/all");
        commit("setBarangs", response.data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    },
  
    async addBarang({ commit }, barang) {
      // Send a POST request to add a new barang and get the created item
      try {
        const response = await this.$axios.post("/barang/add", barang);
        const newItem = response.data;
        commit("addBarang", newItem);
        return newItem; // Return the new item if needed
      } catch (error) {
        console.error("Error creating new barang:", error);
      }
    },
  
    async deleteBarang({ commit }, barangId) {
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
            // Send a DELETE request to remove a barang
            await this.$axios.delete(`/barang/delete/${barangId}`);
            commit("deleteBarang", barangId);
          } catch (error) {
            console.error("Error deleting barang:", error);
          }
        }
      });
    },
  
    async updateBarang({ commit }, updatedBarang) {
      // Send a PUT request to update a barang
      try {
        await this.$axios.put(`/barang/update/${updatedBarang.id}`, updatedBarang);
        commit("updateBarang", updatedBarang);
      } catch (error) {
        console.error("Error updating barang:", error);
      }
    },
  };
  
  export const getters = {
    getBarangs: (state) => state.barangs,
    getBarangById: (state) => (id) => {
      console.log("barang: ", id);
      return state.barangs.find(barang => barang.id == id)
      },
  };