'use client'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, ArrowDown } from 'lucide-react'
import React, { useState } from 'react'
import TokenInput from './TokenInput'
import SendToken from './SendToken'
import { tabs, quickSelectTokens } from '../data/data'
import { Input } from '@/components/ui/input'
import TransactionSettings from './TranscationSetting'

const Swap = () => {
    const [selectedToken, setSelectedToken] = useState({
        symbol: "stHYPE",
        name: "stHYPE",
        logo: "https://liqd.ag/_next/image?url=https%3A%2F%2Fgithub.com%2Fuser-attachments%2Fassets%2F17e8e84d-869f-4853-b080-de829e993b52&w=750&q=75"
    });

    const [selectedBuyToken, setSelectedBuyToken] = useState({
        symbol: "HYPE",
        name: "HYPE",
        logo: "https://liqd.ag/_next/image?url=https%3A%2F%2Fassets.coingecko.com%2Fcoins%2Fimages%2F50882%2Fstandard%2Fhyperliquid.jpg%3F1729431300&w=1920&q=75"
    });

    const [selectedSendToken, setSelectedSendToken] = useState({
        symbol: "",
        name: "",
        logo: ""
    });

    return (
        <div className='flex-1 flex items-start justify-center sm:pt-12 pb-16 sm:px-4 px-2 mt-[50px] overflow-x-hidden'>
            <div className='flex flex-col w-full items-center max-w-[480px] min-w-0'>
                <div className='flex justify-end w-full mb-4'>
                    <Button className='whitespace-nowrap rounded-full focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-gray-700 bg-transparent shadow-sm w-[6.4rem] px-2 py-0.5 h-auto text-xs text-muted-foreground font-normal flex items-center justify-center gap-1 cursor-pointer hover:bg-transparent hover:border-primary hover:text-primary transition-all duration-200'>
                        <Eye /> Show Chart
                    </Button>
                </div>
                <Tabs defaultValue="swap" className="w-full">
                    <div className="w-full flex items-center justify-between mb-1">
                        <TabsList className="gap-2 bg-transparent flex-nowrap min-w-max">
                            {tabs.map((tab) => (
                                <TabsTrigger
                                    key={tab.id}
                                    value={tab.id}
                                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-2.5 py-1.5 h-7 rounded-full hover:text-white text-gray-400 hover:bg-gray-800 data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg flex-shrink-0"
                                >
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <TransactionSettings/>
                    </div>
                    <TabsContent value="swap" >
                        <TokenInput
                            label="Sell"
                            selectedToken={selectedToken}
                            onTokenSelect={setSelectedToken}
                            quickSelectTokens={quickSelectTokens}
                            tooltipText="Add {tokenSymbol} to wallet"
                        />
                        <div className='relative mt-2'>
                            <div className='absolute left-1/2 top-[-24px] transform -translate-x-1/2 z-10'>
                                <Button className="whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring shadow-sm hover:text-primary h-12 w-12 rounded-xl bg-secondary border-4 border-[#05080a] hover:bg-secondary/70 active:bg-secondary-darker transition-colors p-0 flex items-center justify-center">
                                    <ArrowDown className="h-5 w-5 text-primary" style={{ width: '1.4rem', height: '1.4rem' }} />
                                </Button>
                            </div>
                            <TokenInput
                                label="Buy"
                                selectedToken={selectedBuyToken}
                                onTokenSelect={setSelectedBuyToken}
                                quickSelectTokens={quickSelectTokens}
                                tooltipText="Add {tokenSymbol} to wallet"
                                backgroundColor="bg-secondary/40"
                            />
                        </div>
                        <div className='mt-2'>
                            <Button className='inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-2 w-full h-12 rounded-2xl text-base font-medium'>Enter Amount</Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="limit" className="mt-6">
                        <div className="text-center text-gray-400">
                            Limit feature coming soon...
                        </div>
                    </TabsContent>
                    <TabsContent value="send" className="mt-6">
                        <SendToken
                            label="Send"
                            selectedToken={selectedSendToken}
                            onTokenSelect={setSelectedSendToken}
                            quickSelectTokens={quickSelectTokens}
                            tooltipText="Add {tokenSymbol} to wallet"
                        />
                        <div className={`border-gray-700 bg-secondary/20 mt-2 relative rounded-2xl overflow-hidden backdrop-blur-sm border cursor-text hover:border-border-bright/60  p-5 transition-all duration-150`}>
                            <div className='flex flex-col space-y-2'>
                                <div className='flex items-center justify-between text-white'>
                                    <p className="text-sm font-medium text-muted-foreground transition opacity-100">Recipient Address</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <div className='flex-1 min-w-0 mr-2'>
                                        <div className='relative'>
                                            <Input
                                                type='text'
                                                className='w-full border-0 bg-transparent px-0 py-0 h-12 outline-none font-medium text-muted-foreground placeholder:text-muted-foreground/50 transition-colors caret-primary focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                                placeholder="0x..."
                                                style={{ fontSize: '1.2rem' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <Button disabled className='inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-70 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-2 w-full h-12 rounded-2xl text-base font-medium'>Enter Amount</Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="buy" className="mt-6">
                        <div className="text-center text-gray-400">
                            Buy feature coming soon...
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default Swap
