<template>
  <div class="misa-grid-table">
    <table class="misa-table" border="0" cellspacing="0">
      <thead>
        <tr>
          <th class="misa-text-center">
            <BaseCheckbox :checked="data.length == listItemSelected.length" @click="handleToggleAll" />
          </th>
          <th :style="{minWidth:field?.width,maxWidth:field?.width,borderRight:index == fieldRender.length - 1 ? 'none' : ''}" 
              v-for="(field, index) in fieldRender" :key="index" 
              :class="field['textPositionClass']"
          >
            {{ field["fieldDisplay"] }}
          </th>
          <th class="misa-text-center">CHỨC NĂNG</th>
        </tr>
      </thead>

      <div class="misa-table-empty" v-if="data.length == 0">Trống</div>
      <tbody>
        <tr v-for="(row, index) in data" :key="index">
          <td class="misa-text-center">
            <BaseCheckbox @click="handleSelectItem(row[idRow])" :checked="listItemSelected.includes(row[idRow])" />
          </td>

          <td 
            @dblclick="showFormEdit(row[idRow])"
            :style="{minWidth:field?.width,maxWidth:field?.width,borderRight:index == fieldRender.length - 1 ? 'none' : ''}" 
            v-for="(field, index) in fieldRender" 
            :class="field['textPositionClass']" 
            :key="index">
            {{
                !row[field["fieldName"]]
                  ? ""
                  : field["type"] == "date"
                    ? CommonJS.formatDate(row[field["fieldName"]])
                    : row[field["fieldName"]]
            }}
          </td>

          <td class="misa-text-center">
            <div class="misa-table-context-wrapper">
              <div @click="showFormEdit(row[idRow])">Sửa</div>
              <div @click="(e) => showMenuContext(e, row)" class="misa-table-icon-menu-context misa-icon"></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <BaseMenuContext :deleteMethod="handleDeleteItem" :position="positionMenu" ref="menuContext"
      v-show="isShowMenuContext" :duplicateMethod="handleDuplicateItem" />
  </div>
</template>

<script>
import BaseCheckbox from './BaseCheckbox.vue';
import BaseMenuContext from './BaseMenuContext.vue';
import { CommonJS } from "../../JS/Common/Common"
export default {
  data() {
    return {
      //Biến xác định ẩn hiện của menu context
      isShowMenuContext: false,
      //item đang được chọn dùng menu context
      itemSelected: undefined,
      //Tọa độ của menu context
      positionMenu: {
        x: 0,
        y: 0
      },
      //Hàm dùng chung
      CommonJS,
    }
  },
  props: {
    //Dữ liệu sẽ render
    data: Array,
    //Các field sẽ render
    fieldRender: Array,
    //tên khóa chính của đối tượng
    idRow: String,
    //Hàm show form sửa
    showFormEdit: Function,
    //Mảng item được chọn
    listItemSelected: Array,
    //Hàm chọn item
    handleSelectItem: Function,
    //Hàm toggle chọn và bỏ chọn hết
    handleToggleAll: Function
  },
  components: { BaseCheckbox, BaseMenuContext },
  methods: {
    /**
     * Func : Xử lý show menu context
     * Author : Lê Mạnh Hùng (18/7/2022)
     * @param {*} e đối số mặc định của event 
     * @param {*} row thằng được chọn
     */
    showMenuContext(e, row) {
      const screenY = document.body.clientHeight
      const screenX = document.body.clientWidth
      this.positionMenu.x = screenX - e.x
      this.positionMenu.y = e.y + 10

      if (screenY - this.positionMenu.y < 100)
        this.positionMenu.y -= 110

      if (this.itemSelected == row) {
        this.isShowMenuContext = false
        this.itemSelected = undefined
      } else {
        this.itemSelected = row
        this.isShowMenuContext = true
      }
    },

    /**
     * Func : Xử lý sự kiện xóa item
     * Author : Lê Mạnh Hùng (19/7/2022)
     */
    handleDeleteItem() {
      this.isShowMenuContext = false
      this.$emit("delete-row", this.itemSelected)
      this.itemSelected = undefined
    },

    /**
     * Func : Xử lý sự kiện nhân bản
     * Author : Lê Mạnh Hùng (13/8/2022)
     */
    handleDuplicateItem() {
      this.isShowMenuContext = false
      this.$emit("duplicate-row", this.itemSelected[this.idRow])
      this.itemSelected = undefined
    }
  }
}
</script>

<style scoped>
@import url(../../CSS/components/table.css);
</style>