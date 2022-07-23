<template>
    <div class="misa-popup-wrapper">
        <div>
            <div class="misa-popup-content">
                <div :class="{'misa-popup-icon':true,'misa-icon':true, 'misa-popup-icon-confirm-form':type == 'confirm-form'}"></div>
                <div class="misa-popup-text">{{message}}</div>
            </div>
            <div :class="{
                'misa-popup-button':true,
                'misa-popup-confirm-button':type == 'confirm-delete',
                'misa-popup-confirm-form-button':type == 'confirm-form'
                }"
            >
                <BaseButton v-if="type == 'confirm-delete' || type == 'confirm-form'" @click="methodCancel" :typeButton="'outline'" :textButton="'Hủy'" />

                <div>
                    <BaseButton v-if="type == 'confirm-form'" @click="methodReject" :typeButton="'outline'" :textButton="'Không'"/>
                    <BaseButton @click="methodAccept" :typeButton="'contain'" :textButton="textAccept" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseButton from './BaseButton.vue';
    export default {
    components: { BaseButton },
    props: {
        //Câu thông báo
        message: { type:String, required:true},
        //kiểu popup
        type:String,
        //Hàm hủy
        methodCancel:Function,
        //Hàm chấp nhận
        methodAccept:Function,
        //Hàm từ chối
        methodReject:Function,
    },
    computed:{
        textAccept(){
            if(this.type){
                return 'Có'
            }

            return 'Đồng ý'
        }
    }
}
</script>

<style scoped>
@import url(../../CSS/components/popup.css);

</style>