'use client'
import { Button } from '@/components/ui/button'
import { ChevronDown, Search, X, ExternalLink } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from '@/components/ui/input'
import Image from 'next/image'

const TokenSelector = ({ tokenName, tokenImage, quickSelectTokens, onTokenSelect }) => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedToken, setSelectedToken] = useState({
        symbol: tokenName,
        name: tokenName,
        logo: tokenImage
    });

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleClearClick = () => {
        setSearchValue('');
    };

    const handleTokenSelect = (token) => {
        setSelectedToken(token);
        onTokenSelect(token);
    };

    // Filter tokens based on search value
    const filteredTokens = quickSelectTokens.filter(token =>
        token.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
        token.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='inline-flex cursor-pointer items-center justify-center gap-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 border shadow-sm hover:text-accent-foreground h-9 rounded-full p-0 pr-2 flex-shrink-0 whitespace-nowrap transition-colors duration-200 bg-secondary/30 border-border-bright hover:bg-secondary-foreground/10'>
                    <div className="flex items-center">
                        <div className='w-[1.85rem] h-[1.85rem] mr-2 relative left-0.5 overflow-hidden rounded-full border border-border/30'>
                            <Image src={selectedToken.logo} alt='coin' className='w-full h-full' width={40} height={40} />
                        </div>
                        <span className='mr-1 text-base font-medium text-foreground transition opacity-100'>{selectedToken.symbol}</span>
                        <ChevronDown className='w-4 h-4 text-muted-foreground' />
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent hideCloseButton className="fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg rounded-lg sm:max-w-[26rem] sm:top-[50%] bg-backgroundDark p-5 sm:pt-[1.1rem] pt-[2.5rem] max-w-[90vw] border-border-bright border-opacity-30 backdrop-blur-sm">
                <div className="flex items-center justify-between text-primary-foreground">
                    <p className="tracking-tight text-[1.1rem] font-medium">Select a token</p>
                    <DialogClose asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <X className="h-5 w-5" />
                        </Button>
                    </DialogClose>
                </div>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        value={searchValue}
                        onChange={handleInputChange}
                        placeholder="Search by token or paste address"
                        className="w-full h-12 rounded-xl pl-12 pr-12 bg-secondary/30 text-foreground border border-primary/30 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary transition-colors"
                    />
                    {searchValue && (
                        <button
                            onClick={handleClearClick}
                            className="absolute hover:bg-primary p-2 hover:rounded-xl right-4 top-1/2 transform -translate-y-1/2  text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-5 gap-1">
                    {filteredTokens.slice(0, 5).map((token, index) => (
                        <DialogClose asChild key={index}>
                            <button
                                onClick={() => handleTokenSelect(token)}
                                className="flex flex-col items-center justify-center rounded-xl p-2.5 px-4 bg-primary/15 shadow-sm hover:bg-primary/10 active:bg-primary/5 transition-colors duration-150"
                            >
                                <div className="w-7 h-7 relative overflow-hidden rounded-full border border-border/30">
                                    <img
                                        src={token.logo}
                                        alt={token.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="text-sm font-medium mt-1 text-foreground">
                                    {token.symbol}
                                </span>
                            </button>
                        </DialogClose>
                    ))}
                </div>
                <div className='max-h-[450px] overflow-y-auto no-scrollbar -mx-5'>
                    <Collapsible className="w-full" defaultOpen>
                        <CollapsibleTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex items-center w-full justify-between px-3 py-2 sticky top-0 bg-[#1a1f2d] z-20 border-t border-border/30 cursor-pointer"
                            >
                                <span className="text-sm font-medium text-muted-foreground">Default tokens</span>
                                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180" />
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-1 pt-2 ">
                            {filteredTokens.map((token, index) => (
                                <div key={index} className='w-full transition-all duration-150 hover:bg-primary/20 active:bg-primary/10'>
                                    <DialogClose asChild>
                                        <button
                                            onClick={() => handleTokenSelect(token)}
                                            className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-secondary/30 transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-[2.6rem] h-[2.6rem] mr-1.5 relative overflow-hidden rounded-full border border-border/30 flex-shrink-0">
                                                    <img
                                                        src={token.logo}
                                                        alt={token.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-col flex-grow items-start min-w-0">
                                                    <span className="font-semibold text-base text-foreground truncate max-w-[150px]">
                                                        {token.symbol}
                                                    </span>
                                                    <div className='flex items-center w-full'>
                                                        <span className="text-sm text-muted-foreground truncate max-w-[120px]">
                                                            {token.name}
                                                        </span>
                                                        <div className='flex items-center ml-2'>
                                                            <span className='text-xs text-muted-foreground/70'>0x55...5555</span>
                                                            <ExternalLink className='h-3 w-3 ml-1 text-muted-foreground/70 hover:text-primary cursor-pointer' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-medium text-foreground">$0</span>
                                                <div className="text-xs font-medium text-muted-foreground">0.00</div>
                                            </div>
                                        </button>
                                    </DialogClose>
                                </div>
                            ))}
                            {filteredTokens.length === 0 && searchValue && (
                                <div className="text-center py-8 text-muted-foreground">
                                    <p>No tokens found</p>
                                    <p className="text-sm mt-1">Try a different search term</p>
                                </div>
                            )}
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TokenSelector
