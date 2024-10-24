<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PlayCard from '@/components/PlayCard.vue';
import { PlayCardType } from '../types';

const generateSingleTypeCards = (type: number) => {
   const arr = []
   for (let i = 2; i < 15; i++) {
      arr.push({ number: i, type })
   }
   return arr
}

const cards0 = generateSingleTypeCards(0)
const cards1 = generateSingleTypeCards(1)
const cards2 = generateSingleTypeCards(2)
const cards3 = generateSingleTypeCards(3)

const player0 = ref<PlayCardType[]>([])
const player1 = ref<PlayCardType[]>([])
const player2 = ref<PlayCardType[]>([])
const player3 = ref<PlayCardType[]>([])

const getMax: (arr: number[]) => number = (arr) => {
   return arr.sort()[arr.length - 1]
}

const getPlayerCardInfo = (arr: PlayCardType[], name: string) => {
   type PlayCardInfoType = PlayCardType & { len: number, maxType: number }

   const brr: PlayCardInfoType[] = []
   for (let i = 0; i < arr.length; i++) {
      if (brr[arr[i].number]) {
         brr[arr[i].number].len++
         brr[arr[i].number].maxType = brr[arr[i].number].type < arr[i].type ? arr[i].type : brr[arr[i].number].type
      } else {
         brr[arr[i].number] = { ...arr[i], len: 1, maxType: arr[i].type }
      }
   }

   const maxLen = brr.filter(item => item).sort((a, b) => b.len - a.len)[0].len
   const maxCard = brr.filter(item => item.len == maxLen).sort((a, b) => b.number - a.number)[0]

   const maxInfo = {
      name,
      maxLen,
      number: maxCard.number,
      type: maxCard.maxType
   }
   return maxInfo
}

const winner = ref('')
const compare = () => {
   const player0Info = getPlayerCardInfo(player0.value, 'James')
   const player1Info = getPlayerCardInfo(player1.value, 'Curry')
   const player2Info = getPlayerCardInfo(player2.value, 'Harden')
   const player3Info = getPlayerCardInfo(player3.value, 'Durant')

   const arr = [player0Info, player1Info, player2Info, player3Info]

   const maxLen = arr.sort((a, b) => b.maxLen - a.maxLen)[0].maxLen

   const brr = arr.filter(item => item.maxLen == maxLen)

   if (brr.length == 1) {
      winner.value = brr[0].name
   } else {
      const maxNumber = brr.sort((a, b) => b.number - a.number)[0].number
      const crr = brr.filter(item => item.number == maxNumber)

      if (crr.length == 1) {
         winner.value = crr[0].name
      } else {
         winner.value = crr.sort((a, b) => b.type - a.type)[0].name
      }
   }
}

const shuffle = () => {
   winner.value = ''

   player0.value = []
   player1.value = []
   player2.value = []
   player3.value = []
   let arr = [...cards0, ...cards1, ...cards2, ...cards3]
   const len = arr.length
   let count = 0
   const min = 0
   while (count < len) {
      const randomIndex = Math.floor(Math.random() * ((len - 1 - count) - min + 1)) + min;
      const card = { ...arr[randomIndex] }
      const playerIndex = Math.floor(count / 13)
      playerIndex == 0 && player0.value.push(card)
      playerIndex == 1 && player1.value.push(card)
      playerIndex == 2 && player2.value.push(card)
      playerIndex == 3 && player3.value.push(card)
      arr = arr.filter((item, index) => index != randomIndex)
      count++
   }
   setTimeout(() => {
      player0.value.sort((a, b) => b.number - a.number)
      player1.value.sort((a, b) => b.number - a.number)
      player2.value.sort((a, b) => b.number - a.number)
      player3.value.sort((a, b) => b.number - a.number)

      setTimeout(() => {
         compare()
      }, 100);
   }, 1000);
}

</script>

<template>

   <div>
      <div class="flex flex-col items-center">
         <button @click="shuffle">洗牌</button>
         <div class="my-12">
            获胜：<span class="text-lg text-pink-600">{{ winner }}</span>
         </div>
      </div>
      <div class="flex flex-col items-center w-full">
         <div>
            <div class="mb-4 font-semibold text-lg text-center">James</div>
            <div class="flex -space-x-8 justify-center pb-6">
               <PlayCard v-for="(item, index) in player0" :key="index" :number="item.number" :type="item.type" />
            </div>
         </div>
         <div class="flex justify-between space-x-60 px-48">
            <div>
               <div class="mb-4 font-semibold text-lg text-center">Curry</div>
               <div class="flex -space-x-8 flex-wrap w-96">
                  <PlayCard v-for="(item, index) in player1" :key="index" :number="item.number" :type="item.type" />
               </div>
            </div>
            <div>
               <div class="mb-4 font-semibold text-lg text-center">Durant</div>
               <div class="flex -space-x-8 flex-wrap w-96">
                  <PlayCard v-for="(item, index) in player3" :key="index" :number="item.number" :type="item.type" />
               </div>
            </div>
         </div>
         <div>
            <div class="mb-4 mt-6 font-semibold text-lg text-center">Harden</div>
            <div class="flex -space-x-8 justify-center w-full ">
               <PlayCard v-for="(item, index) in player2" :key="index" :number="item.number" :type="item.type" />
            </div>
         </div>
      </div>

   </div>

</template>

<style scoped></style>
