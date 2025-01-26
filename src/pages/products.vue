<script setup>
import { VBtn, VCard, VCol, VRow, VSelect, VTextarea, VTextField } from 'vuetify/components';

const items = [
  "one",
  "two",
  "three",
  "four",
];

definePage({
  meta: {
    not_authenticate: false
  }
})
</script>
<template>
  <div>

    <VRow>
      <VCol
        cols="12"
        md="6"
      >
        <VCard title="Nueva vista">
          <div class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row">
            <div
              class="ma-auto pa-5 border-e"
            >
              <VImg
                width="137"
                height="176"
                src="https://demos.pixinvent.com/materialize-vuejs-admin-template/demo-1/assets/2-xjy_pXoW.png"
              />
            </div>
    
            <div>
              <VCardItem>
                <VCardTitle>Apple iPhone 11 Pro</VCardTitle>
              </VCardItem>
        
              <VCardText>
                Apple iPhone 11 Pro smartphone. Announced Sep 2019. Features 5.8â³ display Apple A13 Bionic
              </VCardText>
            </div>
          </div>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VCard class="px-4 py-5">
          <VRow>
            <VCol
              cols="12"
            >
              <VTextField
                label="Nombre"
                placeholder="Nombre del producto"
              />
            </VCol>
            <VCol
              cols="12"
            >
              <VTextarea
                label="Default"
                placeholder="Placeholder"
              />
            </VCol>
            <VCol
              cols="12"
            >
              <VSelect 
                :items="items"
                label="Select"
                placeholder="Select"
                eager
              />
            </VCol>
            <VCol
              cols="12"
            >
              <VBtn color="primary">
                Guardar
              </VBtn>
            </VCol>
          </VRow>

        </VCard>
      </VCol>
    </VRow>


  </div>
</template>
