<template>
    <view class="h_container">
        <view class="header">
            <a href="#" class="logo">
                <image src="@/static/logo_knowledge_hub_1.webp" mode="heightFix"></image>
            </a>
            <nav>
                <ul>
                    <li>
                        <a href="https://knowledgehub.synfutures.com/">{{ $t('Home') }}</a>
                    </li>
                </ul>
            </nav>
            <view class="btn">
                <a href="https://oyster.synfutures.com/">
                    <image src="@/static/icon_nav_Dapp.svg" mode="heightFix"></image>
                    <view>DApp</view>
                </a>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24"
                    height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <circle cx="10" cy="10" r="7"></circle>
                    <line x1="21" y1="21" x2="15" y2="15"></line>
                </svg>
            </view>
        </view>
    </view>
</template>

<script>

</script>

<style lang="less" scoped>
.h_container {
    white-space: nowrap;
    color: #262626;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    background-color: #E1F3F3;

    .header {
        display: flex;
        position: relative;
        margin-left: auto;
        margin-right: auto;
        max-width: 1232px;
        align-items: center;
        justify-content: center;
        gap: .75rem;
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;

        .logo {
            image {
                height: 32px;
            }
        }

        nav {
            position: relative;
            display: flex;
            flex: 1 1 0%;
            justify-content: flex-start;
            font-size: .875rem;
            line-height: 1.25rem;

            ul {
                list-style: none;
                margin: 0;
                padding: 0;
                display: flex;
                gap: .125rem;

                li {
                    position: relative;
                    display: flex;
                    align-items: center;
                    border-radius: 8px;
                    border-color: transparent;
                    // box-shadow: inset 0 -2px rgba(0, 0, 0, .15);
                    margin-left: .5rem;
                    transition: box-shadow .15s cubic-bezier(.4, 0, .2, 1);
                    // font-weight: 600;

                    a {
                        text-decoration: inherit;
                        display: flex;
                        width: 100%;
                        border-radius: 8px;
                        padding: .375rem .75rem;
                        color: #033;
                    }

                    &:hover {
                        background-color: white;
                    }
                }
            }
        }

        .btn {
            display: flex;
            align-items: center;
            gap: .5rem;

            a {
                text-decoration: inherit;
                display: inline-flex;
                height: 2rem;
                align-items: center;
                justify-content: center;
                gap: .25rem;
                border-radius: 100px;
                border: 1px solid #00bfbf;
                background-color: #00bfbf;
                padding-left: 1rem;
                padding-right: 1rem;

                image {
                    height: 16px;
                }

                view {
                    font-size: .875rem;
                    font-weight: 400;
                    line-height: 1;
                    color: white;
                }
            }
        }
    }
}
</style>