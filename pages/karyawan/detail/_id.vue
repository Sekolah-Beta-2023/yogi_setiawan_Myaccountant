<template>
<div class="container">

<div v-for="karyawan in karyawans" :key="karyawan.id">
<div
class="item-karyawan d-flex align-items-start pt-3 pb-4"
v-if="karyawan.id == paramId">

<div>

<div class="kode-karyawan mb-1">
{{ karyawan.kodekaryawan }}
</div>
<div class="nama mb-1">
{{ karyawan.nama }}
</div>
<div class="jabatan mb-1">
{{ karyawan.jabatan }}
</div>
<div class="umur mb-1">
{{ karyawan.umur }}
</div>
<div class="phone mb-1">
{{ karyawan.phone }}
</div>
<div class="email mb-1">
{{ karyawan.email }}
</div>
<div class="tgl_lahir mb-1">
{{ karyawan.tgl_lahir }}
</div>
<div class="description-karyawan small text-muted">
<img :src="karyawan.imageurl" alt="karyawan Image" class="img-preview karyawan-image" />
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

karyawans:[
	{   
        id:1,
        kodekaryawan:"KK-22",
        nama:"Andi",
        email:"Andi@gmail.com",
        jabatan:"Karyawan Umum",
        umur:"25",
        phone:"08122345678",
        tgl_lahir:"",
		imageurl: 'https://images.unsplash.com/photo-1649282806617-c51bb282899c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  },
	{   
        id:2,
        kodekaryawan:"KK-33",
        nama:"Ando",
        email:"Ando@gmail.com",
        jabatan:"Karyawan Umum",
        umur:"25",
        phone:"08122345677",
        tgl_lahir:"",
		imageurl: 'https://images.unsplash.com/photo-1649282806617-c51bb282899c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  },
		{   
        id:3,
        kodekaryawan:"KK-44",
        nama:"Andu",
        email:"Andu@gmail.com",
        jabatan:"Karyawan Umum",
        umur:"24",
        phone:"08122345679",
        tgl_lahir:"",
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
