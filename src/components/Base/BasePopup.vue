<template>
    <div class="misa-popup-wrapper">
        <div>
            <div class="misa-popup-content">
                <slot></slot>
                <div class="misa-popup-text">{{message}}</div>
                <div class="misa-list-error">
                    <div v-if="listError" v-for="(error,index) in listError" :key="index">{{error}}</div>
                </div>
            </div>

            <div :class="{
                'misa-popup-button':true,
                'misa-popup-confirm-button':type == 'confirm-delete',
                'misa-popup-confirm-form-button':type == 'confirm-form'
                }"
                :style="{justifyContent: type == 'error-popup' ? 'center !important' : ''}"
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
        //list error của form
        listError:Array,
        textAccept:{
            type:String,
            required:true
        }
    },
}
</script>

<style>
@import url(../../CSS/components/popup.css);
</style>