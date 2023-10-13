<template>
<div class="container">

<div v-for="barang in barangs" :key="barang.id">
<div
class="item-barang d-flex align-items-start pt-3 pb-4"
v-if="barang.id == paramId">

<div>

<div class="kode-barang mb-1">
{{ barang.kodebarang }}
</div>
<div class="nama-barang mb-1">
{{ barang.namabarang }}
</div>
<div class="jenis-barang mb-1">
{{ barang.jenisbarang }}
</div>
<div class="jumlah-barang mb-1">
{{ barang.jumlahbarang}}
</div>
<div class="harga-barang mb-1">
{{ barang.hargabarang}}
</div>
<div class="tglmasuk mb-1">
{{ barang.tglmasuk}}
</div>
<div class="description-barang small text-muted">
<img :src="barang.imageurl" alt="Barang Image" class="img-preview barang-image" />
</div>

</div>
</div>
</div>
<div class="action mt-4">


<div class="btn btn-outline-secondary btn-sm mb-3"
@click="$router.go(-1)">Kembali</div>
</div>
</div>

</template>
<script>
export default {
data() {
return {

barangs:[
	{   
        id:1,
        kodebarang:"LP-22",
        namabarang:"laptop 1",
        jenisbarang:"Laptop",
        jumlahbarang :"100",
        hargabarang:"10000",
        tglmasuk:"",
		imageurl: 'https://images.unsplash.com/photo-1649282806617-c51bb282899c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  },
	{   
        id:2,
        kodebarang:"LP-11",
        namabarang:"laptop 2",
        jenisbarang:"Laptop",
        jumlahbarang :"100",
        hargabarang:"10000",
        tglmasuk:"",
		imageurl: 'https://images.unsplash.com/photo-1649282806617-c51bb282899c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  },
	{   
        id:3,
        kodebarang:"LP-33",
        namabarang:"laptop 3",
        jenisbarang:"Laptop",
        jumlahbarang :"100",
        hargabarang:"10000",
        tglmasuk:"",
		imageurl: 'https://images.unsplash.com/photo-1649282806617-c51bb282899c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  },



                ],
}

},


computed: {
    paramId() {
        return this.$route.params.id;
    }
},


}
</script>
