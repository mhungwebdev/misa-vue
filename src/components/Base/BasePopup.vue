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
                'misa-popup-confirm-button':type == PopupMode.CONFIRM_DELETE,
                'misa-popup-confirm-form-button':type == PopupMode.CONFIRM_FORM
                }"
                :style="{justifyContent: horizontalButton}"
            >
                <BaseButton :tabIndex="0" v-if="type == PopupMode.CONFIRM_DELETE || type == PopupMode.CONFIRM_FORM" @click="methodCancel" :typeButton="'outline'" :textButton="'Hủy'" />

                <div>
                    <BaseButton :tabIndex="0" v-if="type == PopupMode.CONFIRM_FORM" @click="methodReject" :typeButton="'outline'" :textButton="'Không'"/>
                    <BaseButton ref="btnAccept" :tabIndex="0" @keydown="e => {if(e.key == 'Enter') methodAccept()}" @click="methodAccept" :typeButton="'contain'" :textButton="textAccept" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { nextTick } from 'vue';
import { PopupMode } from '../../Enum/Enum';
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
        },
        //trạng thái dàn button theo chiều ngang
        horizontalButton:String
    },
    setup(){
        return {PopupMode}
    },
    mounted(){
        if(this.type == PopupMode.ERROR_POPUP || this.type == PopupMode.CONFIRM_FORM){
            nextTick(() => {
                this.$refs.btnAccept.$el.focus()
            })
        }
    }
}
</script>

<style>
@import url(../../CSS/components/popup.css);
</style>