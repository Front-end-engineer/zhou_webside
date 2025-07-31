<template>
    <view class="f_container">
        <view class="footer">
            <view class="footerTabs">
                <view class="footerTabs_left">
                    <view class="items">
                        <a href="https://knowledgehub.synfutures.com" data-brand="">
                            <img
                                src="https://knowledgehub.synfutures.com/assets/logo_knowledge_hub_white.svg?v=8a15d76833">
                        </a>
                        <view>
                            Topics that you are interested in but not covered? <br> Please let us know!
                        </view>
                    </view>
                    <view class="btn">
                        <a href="mailto:academy@synfutures.com">Contact us</a>
                    </view>
                </view>
                <view class="footerTabs_right">
                    <view class="items">
                        <view class="title">SynFutures</view>
                        <view class="link">
                            <a target="#" href="https://oyster.synfutures.com/#/market">Perps</a>
                            <a target="#" href="https://oyster.synfutures.com/#/spot">Spot</a>
                            <a target="#" href="https://ai.synfutures.com/">Synthia</a>
                        </view>
                    </view>
                    <view class="items">
                        <view class="title">Resources</view>
                        <view class="link">
                            <a target="#" href="https://docs.synfutures.com/faq/synfutures-v3-features">FAQ</a>
                            <a target="#" href="https://www.synfutures.com/v3-whitepaper.pdf/">Docs</a>
                            <a target="#" href="https://ai.synfutures.com/">Whitepaper</a>
                            <a target="#" href="https://github.com/SynFutures/">Github</a>
                        </view>
                    </view>
                </view>
            </view>

            <view class="border"></view>

            <view class="logo">
                <view class="logo_left">
                    <text>SynFutures Knowledge Hub | Your DeFi Journey Starts Here © 2025</text>
                    <text> • Published with <a href="https://ghost.org/">Ghost</a></text>
                </view>
                <view class="logo_right">
                    <a target="_blank" rel="noopener" href="https://twitter.com/SynFuturesDefi" aria-label="Twitter">
                        <img src="https://knowledgehub.synfutures.com/assets/icon_sc_twitter.svg?v=8a15d76833">
                    </a>
                    <a href="https://discord.com/invite/F9GjpmXdSx" target="_blank" rel="noopener" aria-label="Discord">
                        <img src="https://knowledgehub.synfutures.com/assets/icon_sc_discord.svg?v=8a15d76833">
                    </a>
                    <a href="https://t.me/synfutures_Defi" target="_blank" rel="noopener" aria-label="Telegram">
                        <img src="https://knowledgehub.synfutures.com/assets/icon_sc_telegram.svg?v=8a15d76833">
                    </a>
                    <a href="https://synfutures.medium.com" target="_blank" rel="noopener" aria-label="Medium">
                        <img src="https://knowledgehub.synfutures.com/assets/icon_sc_medium.svg?v=8a15d76833">
                    </a>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>

</script>

<style lang="less" scoped>
.f_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-left: 1rem;
    padding-right: 1rem;
    gap: 2rem;
    background: #012732;
}

.footer {
    max-width: 1232px;
    width: 100%;
    display: flex;
    gap: 2rem;flex-direction: column;align-items: center;justify-content: flex-start;padding-left: 1rem;
    padding-right: 1rem;    padding-top: 2rem;
    padding-bottom: 2rem;

    .footerTabs {
        width: 100%;
        display: inline-flex;
        align-items: flex-start;
        justify-content: space-between;
        align-self: stretch;
        gap: 1rem;
        flex-direction: row;
        padding-left: 1rem;
        padding-right: 1rem;

        .footerTabs_left {
            display: inline-flex;
            flex-shrink: 1;
            flex-grow: 1;
            flex-basis: 0px;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 2rem;
            padding-top: 1rem;
            padding-bottom: 1rem;

            .items {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                gap: 1rem;

                view {
                    font-size: 1.25rem;
                    font-weight: 700;
                    line-height: 1.75rem;
                    color: white;
                }
            }

            .btn {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                justify-content: center;
                gap: 1rem;
                border-radius: calc(8px + 8px);
                border: 1px solid white;
                padding: 0 1.5rem;
                height: 36px;

                a {
                    color: white;
                    text-decoration: inherit;
                }
            }
        }

        .footerTabs_right {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 2rem;
            width: auto;

            .items {
                display: inline-flex;
                height: 12rem;
                flex-direction: column;
                align-items: flex-start;
                align-items: flex-start;
                padding-top: 1rem;
                width: 220px;
                padding-bottom: 1rem;
                gap: 1rem;

                .title {
                    font-size: .875rem;
                    font-weight: 400;
                    line-height: 1;
                    color: white;
                }

                .link {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    gap: 1rem;

                    a {
                        text-decoration: inherit;
                        font-size: .75rem;
                        font-weight: 400;
                        line-height: 1;
                        color: rgb(148 184 191 / 1);
                    }
                }
            }
        }
    }

    .border {
        height: 0px;
        align-self: stretch;
        border: 1px solid #184858;
    }

    .logo {
        display: inline-flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        align-self: stretch;
        flex-direction: row;
        width: 100%;

        .logo_left {
            font-size: .75rem;
            font-weight: 400;
            line-height: 1;
            color: #94b8bf;
            --tw-text-opacity: 1;
        }

        .logo_right {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
        }
    }
}
</style>