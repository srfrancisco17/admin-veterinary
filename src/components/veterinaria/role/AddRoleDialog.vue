<script setup>

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:isDialogVisible'])


const dialogVisibleUpdate = val => {
  emit('update:isDialogVisible', val)
}


const LIST_PERMISSION = PERMISOS;

console.log(LIST_PERMISSION);

const desserts = [
  {
    dessert: 'Frozen Yogurt',
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Ice cream sandwich',
    calories: 237,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Eclair',
    calories: 262,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Cupcake',
    calories: 305,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Gingerbread',
    calories: 356,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
]


</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    max-width="750"
    @update:model-value="dialogVisibleUpdate"
  >
    <VCard class="refer-and-earn-dialog pa-3 pa-sm-11">
      <!-- 👉 dialog close btn -->
      <DialogCloseBtn
        variant="text"
        size="default"
        @click="emit('update:isDialogVisible', false)"
      />

      <VCardText class="pa-5">
        <div class="mb-6">
          <h4 class="text-h4 text-center mb-2">
            Add Role
          </h4>
        </div>
        <VTextField
          label="Rol: "
          placeholder="Example: Administrador"
        /> 
      </VCardText>
      <VCardText class="pa-5">
        <VBtn color="primary" class="mb-4">
          Guardar
        </VBtn>  
        <VTable>
          <thead>
            <tr>
              <th class="text-uppercase">
                Modulo
              </th>
              <th class="text-uppercase">
                Permiso
              </th>
            </tr>
          </thead>
  
          <tbody>
            <tr
              v-for="(item, index) in LIST_PERMISSION"
              :key="index"
            >
              <td>
                {{ item.name }}
              </td>
              <td>
                <ul>
                  <li style="list-style:none;" v-for="(permiso, index2) in item.permisos" :key="index2">
                    <VCheckbox
                      :label="permiso.name"
                      :value="permiso"
                    />
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </VTable>     
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.refer-link-input {
  .v-field--appended {
    padding-inline-end: 0;
  }

  .v-field__append-inner {
    padding-block-start: 0.125rem;
  }
}
</style>
