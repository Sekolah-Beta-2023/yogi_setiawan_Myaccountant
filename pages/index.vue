<template>
<section class="section min-vh-100" >
<div class="container">
<h1 class="title">My Accountant</h1>
</div>
</section>
</template>
<script>
export default{
middleware: 'guest',

}

</script>
<style scoped>
.section{
        background:  url('static/1.webp') no-repeat;
    background-size: cover;
    background-position: center;
}
</style>
