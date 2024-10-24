<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DatePicker from "primevue/datepicker";
/**
 * earth time : 1970-01-01 00:00:00 -> 2804-18-31 02:02:88
 * alien 1m = 90s
 * alien 1h = 90m
 * alien 1d = 36h
 * alien months = 18
 * alien month days = [44, 42, 48, 40, 48, 44, 40, 44, 42, 40, 40, 42, 44, 48, 42, 40, 44, 38] // 770
 * 
 * earth 0.5s = alien 1s
 */

const alienDaysArr = [44, 42, 48, 40, 48, 44, 40, 44, 42, 40, 40, 42, 44, 48, 42, 40, 44, 38]
const alienAllDays = alienDaysArr.reduce((temp, item) => temp + item) // 770

const getAlienStartTimestamp = () => {
  // 2804-18-31 02:02:88
  const startYearTimestamp = (2804 - 1) * (500 * 90 * 90 * 36 * alienAllDays)
  const startDayTimestamp = (alienAllDays - 7) * (500 * 90 * 90 * 36)
  const startHourTimestamp = 2 * (500 * 90 * 90)
  const startMinuteTimestamp = 2 * (500 * 90)
  const startSecondTimestamp = 88 * 500

  return startYearTimestamp + startDayTimestamp + startHourTimestamp + startMinuteTimestamp + startSecondTimestamp
}

const getAlienDateTime = (timestamp?: number) => {
  const earthTimestamp = new Date().getTime()
  const alienStartTimestamp = getAlienStartTimestamp()
  const alienTimestamp = timestamp != undefined ? timestamp + alienStartTimestamp : earthTimestamp + alienStartTimestamp

  const alienDurationSeconds = Math.floor(alienTimestamp / 500) // e 0.5s == a 1s
  const alienDurationMinutes = Math.floor(alienDurationSeconds / 90)
  const alienDurationHours = Math.floor(alienDurationMinutes / 90)
  const alienDurationDays = Math.floor(alienDurationHours / 36)
  const alienDurationYears = Math.floor(alienTimestamp / (500 * 90 * 90 * 36 * alienAllDays))
  const alienYearDays = Math.floor(alienTimestamp / (500 * 90 * 90 * 36)) - (alienDurationYears * alienAllDays)

  let alienYearMonths = 0
  let daysCount = 0
  let alienMonthDays = 0
  for (let i = 0; i < alienDaysArr.length; i++) {
    daysCount += alienDaysArr[i]
    if (daysCount >= alienYearDays) {
      alienYearMonths = i + 1
      alienMonthDays = alienYearDays - (daysCount - alienDaysArr[i])
      break
    }
  }
  const alienDayHours = alienDurationHours - alienDurationDays * 36
  const alienHourMinutes = alienDurationMinutes - alienDurationHours * 90
  const alienMinuteSeconds = alienDurationSeconds - alienDurationMinutes * 90

  // years should add 1
  // console.log(alienDurationYears + 1, alienYearMonths, alienMonthDays, alienDayHours, alienHourMinutes, alienMinuteSeconds)

  return `${alienDurationYears + 1}/${alienYearMonths}/${alienMonthDays} ${alienDayHours}:${alienHourMinutes}:${alienMinuteSeconds}`
}

const alienTime = ref('')
const countAlienTime = () => {
  setTimeout(() => {
    alienTime.value = getAlienDateTime()
    countAlienTime()
  }, 500);
}

const earthTime = ref('')
const countEarthTime = () => {
  const theDate = new Date()
  setTimeout(() => {
    earthTime.value = theDate.toLocaleDateString() + ' ' + theDate.toLocaleTimeString()
    countEarthTime()
  }, 1000);
}

const datetime = ref()
const alienSelectedDatetime = ref('')

onMounted(() => {
  countAlienTime()
  countEarthTime()
})

const selectEarthTime = (val: any) => {
  alienSelectedDatetime.value = getAlienDateTime(val.getTime())
}

</script>
<template>
  <div class="flex flex-col">
    <div class="w-fit m-auto flex items-center space-x-20 text-center">
      <div>
        <div class="text-3xl py-4">Earth Time</div>
        <div class="text-6xl">{{ earthTime }}</div>
      </div>
      <div>
        <div class="text-3xl py-4">Alien Time</div>
        <div class="text-6xl">{{ alienTime }}</div>
      </div>
    </div>

    <div class="w-fit m-auto mt-24 flex items-center space-x-20 text-center">
      <div>
        <div>Select Earth Time</div>
        <DatePicker class="w-96" v-model="datetime" @date-select="selectEarthTime" showTime hourFormat="24" fluid />
      </div>
      <div>
        <div class="text-lg py-4">Earth Time => Alien Time</div>
        <div class="text-3xl">{{ alienSelectedDatetime }}</div>
      </div>
    </div>
  </div>
</template>



<style scoped></style>