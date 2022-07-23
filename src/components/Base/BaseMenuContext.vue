<template>
    <div :style="{top:position.y + 'px', right:position.x + 'px'}" class="misa-table-menu-context misa-text-left">
        <div class="misa-table-menu-context-item">Nhân bản</div>
        <div @click="deleteMethod" id="misa-button-delete-employee" class="misa-table-menu-context-item">Xóa</div>
        <div class="misa-table-menu-context-item">Ngừng sử dụng</div>
    </div>
</template>

<script>
    export default {
        name:'BaseMenuContext',
        props:{
            //Vị trí cho menu context
            position:{
                x:Number,
                y:Number,
            },
            //Hàm xóa
            deleteMethod:Function,
        },
    }
</script>

<style scoped>
@import url(../../CSS/components/menuContext.css);
</style>