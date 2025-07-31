<template>
  <!-- <sidebar-menu :menu="menu" :hideToggle="false" :smoothScroll="false"/> -->
  <Header />
  <view class="container">
    <image
      class="hero-bg"
      src="../../static/hero-bg.png"
      mode="widthFix"
    ></image>
    <view class="page-container">
      <view class="banner">
        <view class="title">
          <div>{{ $t("news_announcement") }}</div>
          <text>{{ $t("news_stayUpdated") }}</text>
        </view>
        <view class="img">
          <image src="@/static/community.png" mode="heightFix"></image>
        </view>
      </view>

      <DataLoading :loading="isDataLoading" />
      <view class="list" v-if="!isDataLoading">
        <view
          class="list_items"
          v-for="item in newsList"
          :key="item.id"
          @click="toNewsDetail(item.id)"
        >
          <image
            class="img"
            :src="item.img"
            style="background: #013840"
          ></image>
          <view class="content">
            <view class="title">{{ item.title }}</view>
            <view class="txt">{{ item.subhead }}</view>
          </view>
          <view class="list_footer">
            <view class="time">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4 1.125C4.20711 1.125 4.375 1.29289 4.375 1.5V2.125H7.625V1.5C7.625 1.29289 7.79289 1.125 8 1.125C8.20711 1.125 8.375 1.29289 8.375 1.5V2.125H9C9.36467 2.125 9.71441 2.26987 9.97227 2.52773C10.2301 2.78559 10.375 3.13533 10.375 3.5V9.5C10.375 9.86467 10.2301 10.2144 9.97227 10.4723C9.71441 10.7301 9.36467 10.875 9 10.875H3C2.63533 10.875 2.28559 10.7301 2.02773 10.4723C1.76987 10.2144 1.625 9.86467 1.625 9.5V3.5C1.625 3.13533 1.76987 2.78559 2.02773 2.52773C2.28559 2.26987 2.63533 2.125 3 2.125H3.625V1.5C3.625 1.29289 3.79289 1.125 4 1.125ZM2.375 4.125H9.625V3.5C9.625 3.33424 9.55915 3.17527 9.44194 3.05806C9.32473 2.94085 9.16576 2.875 9 2.875H3C2.83424 2.875 2.67527 2.94085 2.55806 3.05806C2.44085 3.17527 2.375 3.33424 2.375 3.5V4.125ZM9.625 4.875H2.375V9.5C2.375 9.66576 2.44085 9.82473 2.55806 9.94194C2.67527 10.0592 2.83424 10.125 3 10.125H9C9.16576 10.125 9.32473 10.0592 9.44194 9.94194C9.55915 9.82473 9.625 9.66576 9.625 9.5V4.875Z"
                  fill="#94B8BF"
                ></path>
              </svg>
              <text>{{ item.create_time }}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="pagination">
        <a
          href="javascript:void(0)"
          class="leftbtn"
          @click="toPrevPage"
          :style="{
            color: 'white',
            cursor:
              newsListPageData.page == 1 ||
              newsListPageData.total == 0 ||
              isDataLoading
                ? 'not-allowed'
                : 'pointer',
          }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-chevron-left"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M15 6l-6 6l6 6"></path>
          </svg>
          <text>{{ $t("news_prev") }}</text>
        </a>
        <text style="color: white"
          >{{ $t("news_page") }} {{ newsListPageData.page }}
          {{ $t("news_of") }} {{ newsListPageData.last_page }}</text
        >
        <a
          href="javascript:void(0)"
          class="leftbtn"
          @click="toNextPage"
          :style="{
            color: 'white',
            cursor:
              newsListPageData.page == newsListPageData.last_page ||
              newsListPageData.total == 0 ||
              isDataLoading
                ? 'not-allowed'
                : 'pointer',
          }"
        >
          <text>{{ $t("news_next") }}</text>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-chevron-right"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M9 6l6 6l-6 6"></path>
          </svg>
        </a>
      </view>
    </view>
  </view>
  <Footer />
</template>

<script setup>
// import Header from './header.vue';
// import Footer from './footer.vue';
import { ref } from "vue";
import { getNewsList } from "@/api/index";

let menu = ref([
  {
    header: "Main Navigation",
    hiddenOnCollapse: true,
  },
  {
    href: "/",
    title: "Dashboard",
    icon: "fa fa-user",
  },
  {
    href: "/charts",
    title: "Charts",
    icon: "fa fa-chart-area",
    child: [
      {
        href: "/charts/sublink",
        title: "Sub Link",
      },
    ],
  },
]);

let tabList = ref([
  {
    text: "标签1",
    name: "content0", // 与 slot 名称对应
  },
  {
    text: "标签2",
    name: "content1", // 与 slot 名称对应
  },
  // 更多标签项
]);

let newsList = ref([]);
let newsListPageData = ref({
  page: 1,
  limit: 6,
  total: 0,
});

let isDataLoading = ref(false);
const fetchNewsList = () => {
  isDataLoading.value = true;
  let params = {
    type: 1,
  };
  if (newsListPageData) {
    let { limit, page } = newsListPageData.value;
    params = {
      ...params,
      limit,
      page,
    };
  }
  getNewsList(params).then((res) => {
    if (res.code == 1) {
      isDataLoading.value = false;
      let result = res.data;
      newsList.value = res.data.data;
      newsListPageData.value = {
        page: result.current_page,
        last_page: result.last_page,
        limit: result.per_page,
        total: result.total,
      };
    }
  });
};
fetchNewsList();

const toPrevPage = () => {
  let { page } = newsListPageData.value;
  if (page == 1) return;
  newsListPageData.value.page = newsListPageData.value.page - 1;
  fetchNewsList();
};

const toNextPage = () => {
  let { page, last_page } = newsListPageData.value;
  if (page == last_page) return;
  newsListPageData.value.page += 1;
  fetchNewsList();
};

const toNewsDetail = (id) => {
  uni.navigateTo({
    url: `/pages/announcement/newDetail?id=${id}`,
  });
};
</script>

<style>
::v-deep .slideout-header .el-menu {
  color: white;
  border-right: 1px solid #030a12;
}

::v-deep .slideout-header .el-menu li.is-active {
  color: white !important;
}

.slideout-panel {
  border: none !important;
  background-color: #030a12;
}

.slideout-header {
  color: white;
  border-bottom: #030a12;
}

.slideout-btn--close {
  border: 2px solid white;
}

.slideout-btn--close svg {
  fill: white;
}

.slideout_link {
  display: flex;
  width: calc(100% - 60px);
  align-items: center;
  justify-content: center;
  text-wrap: nowrap;
  border-radius: 9999px;
  background-color: white;
  padding: 10px;
  font-weight: 700;
  line-height: 1.5rem;
  color: #040c16;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  text-decoration: inherit;
  margin: 0 auto;
}

.slideout_link svg {
  margin-right: 0.3rem;
}
</style>

<style lang="less" scoped>
.container {
  background-color: var(--main-color);
  padding-bottom: 50rpx;
}
.page-container {
  max-width: 1800rpx;
  margin: 0 auto;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  border-radius: 1rem;
  position: relative;
  padding: 0 50rpx;
  // background-color: var(--main-color);

  @media screen and (max-width: 900px) {
    padding: 20rpx;
  }

  .banner {
    box-sizing: border-box;
    position: relative;
    // margin-bottom: 2rem;
    height: 15rem;
    width: 100%;
    align-items: center;
    // justify-content: flex-start;
    justify-content: space-between;
    border-radius: 1rem;
    background-color: #00bfbf;
    padding: 1.25rem;
    display: inline-flex;
    gap: 168px;

    .title {
      color: white;
      display: inline-flex;
      // flex: 1 1 0%;
      flex-direction: column;
      justify-content: flex-start;
      gap: 0.5rem;
      font-size: var(--sTitle);

      div {
        font-weight: 700;
        font-size: 2.25rem;
        line-height: 2.5rem;
      }

      text {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size: var(--sTitle);
        line-height: 1.75rem;
      }
    }

    .img {
      position: absolute;
      right: 0rpx;
      // bottom: 0;
      height: 70%;
      uni-image {
        height: 100%;
      }
    }

    @media (max-width: 900px) {
      .img {
        display: none;
      }
    }
  }

  .list {
    display: grid;
    width: 100%;
    gap: 1.5rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: 30rpx;

    .list_items {
      display: flex;
      position: relative;
      width: 100%;
      align-items: flex-start;
      overflow: hidden;
      padding: 0;
      flex-direction: column;
      border-radius: 8px;
      gap: 1rem;
      cursor: pointer;
    }

    .img {
      display: block;
      vertical-align: middle;
      max-width: 100%;
      width: 100%;
      border-radius: 1rem;
      height: 15rem;
    }

    .content {
      display: flex;
      width: 100%;
      flex-direction: column;
      gap: 0.625rem;
      overflow: hidden;

      .title {
        // color: #9b9b9b;
        font-weight: 700;
        font-size: var(--sTitle);
      }

      .txt {
        color: #9b9b9b;
        font-size: var(--txtFs);
      }
    }

    .list_footer {
      display: flex;
      height: 1rem;
      flex-shrink: 1;
      flex-grow: 1;
      flex-basis: 0px;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      .time {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 0.25rem;
        color: #94b8bf;
        font-size: 0.75rem;
        padding-left: 15px;
      }
    }

    @media (max-width: 900px) {
      display: flex;
      flex-direction: column;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: color-mix(in srgb, #262626 100%, white 30%);
    gap: 1.5rem;
    margin-top: 3rem;
    margin-bottom: 3rem;

    a {
      transition-property: box-shadow;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 0.15s;
      padding-left: 1rem;
      padding-right: 1rem;
      color: inherit;
      text-decoration: inherit;
      display: flex;
      align-items: center;
      gap: 0.125rem;
      border-width: 1px;
      border: 1px solid #e6e6e6;
      border-radius: 1rem;
      padding: 0.25rem 1rem;

      svg {
        width: 16px;
        height: 16px;
      }
    }

    .a_check {
      --tw-shadow: inset 0 -2px 0 #e6e6e6;
      --tw-shadow-colored: inset 0 -2px 0 var(--tw-shadow-color);
      box-shadow: 0 0 #0000, 0 0 #0000, inset 0 -2px 0 #e6e6e6;
    }
  }
}

.example-body {
  flex-direction: column;
  flex: 1;
}

.content {
  padding: 0 15px;
}

.text {
  font-size: 14px;
  color: #666;
  line-height: 20px;
}

.button {
  // margin-top: 10px;
  margin: 10px;
  margin-bottom: 0;
}
</style>
