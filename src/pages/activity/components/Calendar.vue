<template>
  <view class="calendar-container">
    <view class="head">
      <!-- <view class="date-btn" @click="openSelectDate"
        >{{ selectDate }}
        <el-icon :size="20">
          <ArrowRight />
        </el-icon>
      </view> -->
      <view class="arrow">
        <el-icon :size="20" @click="prevMonth">
          <ArrowLeft />
        </el-icon>
        {{ currentDate.getMonth() + 1 + $t("components.Calendar.129468-0") }}
        <el-icon :size="20" @click="nextMonth">
          <ArrowRight />
        </el-icon>
      </view>
      <view class="sign-day"
        >{{ $t("components.Calendar.129468-1") }} {{ moreSignDays }}
        {{ $t("components.Calendar.129468-2") }}</view
      >
      <view></view>
    </view>
    <view class="calendar-grid">
      <!-- <view class="week" v-for="day in days" :key="day">{{ day }}</view> -->
      <view
        class="date"
        v-for="(date, index) in dates"
        :key="index"
        :class="{
          today: isToday(date),
          punched: isPunched(date),
          'not-punched': isNotPunched(date),
          'not-current-month': isCurrentMonth(date),
          'selected-date': isSelectedDate(date),
        }"
        @click="punch(date)"
      >
        {{ date.getDate() }}
        <view
          v-if="!isCurrentMonth(date)"
          class="tip"
          :style="
            !isToday(date)
              ? isPunched(date) && 'color: #3B6382'
              : 'color: transparent'
          "
          >{{
            isPunched(date)
              ? $t("components.Calendar.129468-3")
              : isDateALessThanB(date, today)
              ? $t("components.Calendar.129468-4")
              : $t("components.Calendar.129468-5")
          }}</view
        >
      </view>
    </view>
    <!-- <up-datetime-picker
      :show="show"
      mode="year-month"
      v-model="formatCurrentDate"
      :closeOnClickOverlay="true"
      confirmText="确认"
      cancelText="取消"
      @close="handleCancel"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    ></up-datetime-picker> -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(), // 当前显示的日期
      formatCurrentDate:
        new Date().getFullYear() + "-" + (new Date().getMonth() + 1), // 当前显示的日期（格式为年-月）
      show: false,
      today: new Date(),
      punchDate: null,
    };
  },
  props: {
    // 已签到的日期
    punchedDates: {
      type: Array,
      default: () => [],
    },
    moreSignDays: {
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    // 星期名字
    days() {
      return [
        // this.$t("Calendar.Calendar.489092-0"),
        // this.$t("Calendar.Calendar.489092-1"),
        // this.$t("Calendar.Calendar.489092-2"),
        // this.$t("Calendar.Calendar.489092-3"),
        // this.$t("Calendar.Calendar.489092-4"),
        // this.$t("Calendar.Calendar.489092-5"),
        // this.$t("Calendar.Calendar.489092-6"),
        this.$t("components.Calendar.129468-6"),
        this.$t("components.Calendar.129468-7"),
        this.$t("components.Calendar.129468-8"),
        this.$t("components.Calendar.129468-9"),
        this.$t("components.Calendar.129468-10"),
        this.$t("components.Calendar.129468-11"),
        this.$t("components.Calendar.129468-12"),
      ];
    },
    dates() {
      const startOfMonth = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        1
      );
      const endOfMonth = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        0
      );
      const dates = [];

      // 填充上个月的日期
      let firstDayIndex = startOfMonth.getDay(); // 获取当前月份第一天是星期几
      const lastMonthDateCount = new Date(
        startOfMonth.getFullYear(),
        startOfMonth.getMonth(),
        0
      ).getDate(); // 上个月的总天数

      firstDayIndex = (firstDayIndex + 6) % 7; // 调整星期的顺序，这里是星期一开始

      for (let i = 0; i < firstDayIndex; i++) {
        dates.push(
          new Date(
            startOfMonth.getFullYear(),
            startOfMonth.getMonth() - 1, // 上一个月
            lastMonthDateCount - firstDayIndex + 1 + i // 计算上个月的日期
          )
        );
      }

      // 填充本月的日期
      for (let i = 1; i <= endOfMonth.getDate(); i++) {
        dates.push(
          new Date(
            this.currentDate.getFullYear(),
            this.currentDate.getMonth(),
            i
          )
        );
      }

      // 填充下个月的日期
      let lastDayIndex = endOfMonth.getDay();
      lastDayIndex = lastDayIndex ? 7 - lastDayIndex : lastDayIndex; // 调整星期的顺序，这里是星期一开始

      for (let i = 0; i < lastDayIndex; i++) {
        dates.push(
          new Date(endOfMonth.getFullYear(), endOfMonth.getMonth() + 1, i + 1)
        );
      }
      return dates;
    },
    // 年月日选择器显示的日期名
    selectDate() {
      // return this.$t("Calendar.Calendar.489092-8", [
      //   this.currentDate.getMonth() + 1,
      //   this.currentDate.getFullYear(),
      // ]);
      return (
        this.currentDate.getFullYear() +
        this.$t("components.Calendar.129468-13") +
        (this.currentDate.getMonth() + 1) +
        this.$t("components.Calendar.129468-0")
      );
    },
  },
  watch: {
    currentDate(newVal, oldVal) {
      this.formatCurrentDate =
        newVal.getFullYear() + "-" + (newVal.getMonth() + 1);
    },
  },
  created() {
    console.log(this.formatCurrentDate, "init");
  },
  methods: {
    // 切换为上一个月
    prevMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.currentDate = new Date(this.currentDate);
    },
    // 切换为下一个月
    nextMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.currentDate = new Date(this.currentDate);
    },
    // 判断是否今天
    isToday(date) {
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    },
    // 选中日期
    punch(date) {
      this.punchDate = date;
      this.$emit("calendarPunch", date);
    },
    // 是否打卡签到
    isPunched(date) {
      return this.punchedDates.includes(date.toDateString());
    },
    // 是否未打卡签到
    isNotPunched(date) {
      return (
        !this.isCurrentMonth(date) &&
        !this.punchedDates.includes(date.toDateString()) &&
        this.isDateALessThanB(date, this.today)
      );
    },
    // 是否当前月
    isCurrentMonth(date) {
      return !(
        date.getMonth() === this.currentDate.getMonth() &&
        date.getFullYear() === this.currentDate.getFullYear()
      );
    },
    // 是否选中的日期
    isSelectedDate(date) {
      return date.toDateString() === this.punchDate?.toDateString();
    },
    // DateA 是否小于（早于）DateB
    isDateALessThanB(dateA, dateB) {
      const yearA = dateA.getFullYear();
      const monthA = dateA.getMonth();
      const dayA = dateA.getDate();

      const yearB = dateB.getFullYear();
      const monthB = dateB.getMonth();
      const dayB = dateB.getDate();

      if (yearA < yearB) {
        return true;
      } else if (yearA === yearB) {
        if (monthA < monthB) {
          return true;
        } else if (monthA === monthB) {
          if (dayA < dayB) {
            return true;
          }
        }
      }
      return false;
    },
    openSelectDate() {
      this.show = true;
    },
    handleCancel() {
      this.show = false;
    },
    handleConfirm(e) {
      this.currentDate = new Date(e.value);
      this.handleCancel();
    },
  },
};
</script>

<style scoped lang="scss">
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 34rpx;
  color: #fff;
  margin-top: 60rpx;
  .date-btn {
    display: flex;
    align-items: center;
    gap: 18rpx;
    img {
      width: 28rpx;
      height: 26rpx;
    }
  }
  .arrow {
    display: flex;
    align-items: center;
    gap: 20rpx;
    font-size: 38rpx;
    > i {
      cursor: pointer;
    }
    > img {
      margin: 0 20rpx;
      padding: 0 10rpx;
      width: 30rpx;
      height: 26rpx;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}

.week {
  margin-top: 30rpx;
  color: #ccbaad;
  font-size: 29rpx;
  text-align: center;
}
.calendar-container {
  width: 100%;
  margin: auto;
  overflow: hidden;
  padding: 0 6vw;
  box-sizing: border-box;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 200rpx;
  justify-items: center;
  align-items: center;
}
.date {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10rpx;
  width: 220rpx;
  height: 160rpx;
  transition: background-color 0.3s;
  font-size: 40rpx;
  color: #fff;
  background: linear-gradient(184deg, #054b4f -28.14%, #01363b 68.25%);
  border-radius: 12rpx;
  .tip {
    font-size: 28rpx;
  }
}

.today {
  // border: 2rpx solid #8cde90;
  border-radius: 8rpx;
  position: relative;
  &::after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0 0 12rpx 12rpx;
    content: "今天";
    background: #00bfbf;
    text-align: center;
    width: 100%;
    font-size: 20rpx;
    height: 50rpx;
    line-height: 50rpx;
  }
}

.punched {
  position: relative;
  &::before {
    content: "✔";
    background: #00bfbf;
    position: absolute;
    right: 0;
    top: 0;
    width: 50rpx;
    height: 36rpx;
    border-radius: 0px 12rpx 0px 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
  }
}

.not-punched {
  position: relative;
  // background-color: #fcece6;
  // color: #fd7e51;
  &::before {
    content: "X";
    background: #ff5353;
    position: absolute;
    right: 0;
    top: 0;
    width: 50rpx;
    height: 36rpx;
    border-radius: 0px 12rpx 0px 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
  }
}

.not-current-month {
  background: transparent;
  color: transparent;
}

.selected-date {
  // border: 2rpx solid #8c9fde;
}

.sign-day {
  margin-left: -180rpx;
  font-size: 44rpx;
}

@media (max-width: 900px) {
  .calendar-container {
    padding: 0;
    .head {
      .sign-day {
        margin: 0;
      }
    }
    .date {
      width: 140rpx;
      height: 140rpx;
      .tip {
        font-size: 26rpx;
      }
    }
    .punched::before,
    .not-punched::before {
      font-size: 18rpx;
      width: 40rpx;
      height: 28rpx;
    }
    .today::after {
      height: 40rpx;
      line-height: 40rpx;
    }
  }
}
</style>
