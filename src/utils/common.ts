/**
 * 根据加密货币名称返回对应图像路径
 * 此函数用于映射加密货币名称到其对应的图像资源路径通过这种方式，可以轻松地根据货币名称获取到正确的图像进行显示或使用
 * @param name 加密货币名称，如 'BTC', 'USDT', 'TRX', 'ETH', 'SOL'
 * @returns 返回对应加密货币的图像路径如果名称不匹配任何预定义的货币，将返回 `undefined`
 */
import BTC from '@/static/images/coinImage/btc.png';
import USDT from '@/static/priceContentimg.png';
import TRX from '@/static/images/coinImage/trx.png';
import ETH from '@/static/images/coinImage/eth.png';
import SOL from '@/static/images/coinImage/sol.png';
export const coinImageMap=(name:string)=>{
    switch (name){
        case 'BTC':
            return BTC
        case 'USDT':
            return USDT
        case 'TRX':
            return TRX
        case 'ETH':
            return ETH
        case 'SOL':
            return SOL
    }
}
