<template>
    <div @click="toggleSelect" 
        :class="{'misa-checkbox':true,'misa-checkbox-checked':checkedData}">
        <div></div>
    </div>
</template>

<script>
    export default {
        name:'BaseCheckbox',
        data(){
            return {
                //Xác định checkbox được check không
                checkedData:false
            }
        },
        props:{
            //checked xác định theo toggle all
            checked:Boolean
        },
        methods:{
            /**
             * Func : Thay đổi trạng thái checkbox
             * Author : Lê Mạnh Hùng (15/7/2022)
             */
            toggleSelect(){
                this.checkedData = !this.checkedData
            }
        },
        watch:{
            checked(newValue,oldValue){
                this.checkedData = newValue
            }
        }
    }
</script>

<style scoped>
@import url(../../CSS/components/checkbox.css);

</style>