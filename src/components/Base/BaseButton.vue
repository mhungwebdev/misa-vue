<template>
    <div :tabIndex="tabIndex" @click="method" :class="['misa-button',classButton]">
        <div>{{textButton}}</div>
        <div v-if="tooltip != undefined" class="misa-btn-tooltip">{{tooltip}}</div>
    </div>
</template>

<script>
    export default {
        name:'BaseButton',
        props: {
            //kiểu button
            typeButton:String,
            //text trên button
            textButton:String,
            //Hàm chức năng
            method:Function,
            tabIndex:Number,
            tooltip:String,
        },
        computed:{
            /**
             * Func : trả về class tưởng ứng với mỗi kiểu button
             * Author : Lê Mạnh Hùng (15/7/2022)
             */
            classButton(){
                const classButton = this.typeButton == "contain" ? "misa-button-default" : "misa-button-outline"

                return classButton
            }
        }
    }
</script>

<style scoped>
    @import url("../../CSS/components/button.css");
    @import url("../../CSS/components/buttonOutline.css");
</style>