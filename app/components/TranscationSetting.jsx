'use client'
import { Button } from '@/components/ui/button'
import { X, Settings, AlertTriangle } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

const TransactionSettings = () => {
    const [slippageTolerance, setSlippageTolerance] = useState('1.0');
    const [customSlippage, setCustomSlippage] = useState('');
    const [selectedSlippage, setSelectedSlippage] = useState('1.0');
    const [dexSettings, setDexSettings] = useState({
        kittenSwapV2: true,
        kittenSwapV3: true,
        hyperSwapV2: true,
        hyperSwapV3: false,
        laminarV3: true
    });
    const [transactionSettings, setTransactionSettings] = useState({
        alwaysMaxApproval: true,
        hidePriceImpactWarnings: true
    });

    const slippageOptions = ['0%', '0.5%', '1.0%'];

    const handleSlippageSelect = (value) => {
        setSelectedSlippage(value);
        setSlippageTolerance(value);
        setCustomSlippage('');
    };

    const handleCustomSlippageChange = (e) => {
        const value = e.target.value;
        setCustomSlippage(value);
        if (value) {
            setSelectedSlippage('custom');
            setSlippageTolerance(value);
        }
    };

    const handleDexSettingChange = (key, checked) => {
        setDexSettings(prev => ({
            ...prev,
            [key]: checked
        }));
    };

    const handleTransactionSettingChange = (key, checked) => {
        setTransactionSettings(prev => ({
            ...prev,
            [key]: checked
        }));
    };

    const dexOptions = [
        { key: 'kittenSwapV2', label: 'KittenSwapV2', fees: '(0.02%, 0.3%)' },
        { key: 'kittenSwapV3', label: 'KittenSwapV3', fees: '(0.01%, 0.25%, 0.75%)' },
        { key: 'hyperSwapV2', label: 'HyperSwapV2', fees: '(0.3%)' },
        { key: 'hyperSwapV3', label: 'HyperSwapV3', fees: '(0.05%, 0.3%, 1%)' },
        { key: 'laminarV3', label: 'LaminarV3', fees: '(0.05%, 0.3%, 1%)' }
    ];

    return (
        <Dialog>
            <div className='flex items-center'>
                <DialogTrigger asChild>
                    <Button variant="outline" className="transition-all duration-200">
                        <div className="flex items-center gap-1.5 text-xs px-2 py-0.5 bg-gray-800/50 border border-gray-700 rounded-full backdrop-blur-sm hover:border-primary transition-all duration-200 group">
                            <div className="flex items-center justify-center w-3 h-3">
                                <AlertTriangle className="w-full h-full text-gray-400 group-hover:text-primary transition-all duration-200" />
                            </div>
                            <span className="text-white font-medium group-hover:text-primary transition-all duration-200">{slippageTolerance}%</span>
                            <div className="flex items-center justify-center w-3 h-3">
                                <Settings className="w-full h-full text-gray-400 group-hover:text-primary transition-all duration-200" />
                            </div>
                        </div>
                    </Button>
                </DialogTrigger>
                <div className='w-5 h-5 rounded-full border border-gray-700'></div>
            </div>

            <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg rounded-lg sm:max-w-[26rem] sm:top-[50%] bg-[#141823] p-5 sm:pt-[1.1rem] pt-[2.5rem] max-w-[90vw] border-border-bright border-opacity-30 backdrop-blur-sm">
                <div className="flex items-center justify-between text-primary-foreground">
                    <DialogTitle className="tracking-tight text-[1.1rem] font-medium">Transaction Settings</DialogTitle>
                    <DialogClose asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <X className="h-5 w-5" />
                        </Button>
                    </DialogClose>
                </div>

                {/* Slippage Tolerance Section */}
                <div className="space-y-3">
                    <div>
                        <h3 className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm text-muted-foreground mb-2 block">Slippage Tolerance</h3>
                        <div className="flex items-center gap-2">
                            {slippageOptions.map((option) => (
                                <Button
                                    key={option}
                                    variant={selectedSlippage === option ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handleSlippageSelect(option)}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedSlippage === option
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-secondary/30 border border-border-bright text-foreground hover:bg-primary/10'
                                        }`}
                                >
                                    {option}
                                </Button>
                            ))}
                            <div className="relative flex-1 flex items-center gap-1">
                                <Input
                                    value={customSlippage}
                                    onChange={handleCustomSlippageChange}
                                    placeholder="0"
                                    className="w-20 h-8 rounded-lg bg-secondary/30 text-foreground border border-border-bright placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary transition-colors"
                                />
                                <span className="text-sm text-muted-foreground">%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='shrink-0 bg-border h-[1px] w-full my-2'></div>
                {/* DEX Settings Section */}
                <div className="space-y-3">
                    <div>
                        <h3 className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm text-muted-foreground mb-2 block">DEX Settings</h3>
                        <p className="text-xs text-muted-foreground mb-2">Select which DEXes to include in your swap quotes</p>
                    </div>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                        {dexOptions.map((dex) => (
                            <div key={dex.key} className="flex items-center space-x-3 rounded-lg hover:bg-secondary/30 transition-colors">
                                <Checkbox
                                    id={dex.key}
                                    checked={dexSettings[dex.key]}
                                    onCheckedChange={(checked) => handleDexSettingChange(dex.key, checked)}
                                    className="border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-full"
                                />
                                <label
                                    htmlFor={dex.key}
                                    className="flex-1 cursor-pointer flex items-center justify-between"
                                >
                                    <span className="text-sm font-medium text-foreground">{dex.label}</span>
                                    <span className="text-xs text-muted-foreground">{dex.fees}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='shrink-0 bg-border h-[1px] w-full my-2'></div>
                {/* Transaction Settings Section */}
                <div className="space-y-3">
                    <h3 className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm text-muted-foreground mb-2 block">Transaction Settings</h3>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-3  rounded-lg hover:bg-secondary/30 transition-colors">
                            <Checkbox
                                id="alwaysMaxApproval"
                                checked={transactionSettings.alwaysMaxApproval}
                                onCheckedChange={(checked) => handleTransactionSettingChange('alwaysMaxApproval', checked)}
                                className="border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-full"
                            />
                            <label
                                htmlFor="alwaysMaxApproval"
                                className="flex-1 cursor-pointer"
                            >
                                <span className="text-sm font-medium text-foreground">Always Max Approval</span>
                            </label>
                        </div>
                        <div className="flex items-center space-x-3  rounded-lg hover:bg-secondary/30 transition-colors">
                            <Checkbox
                                id="hidePriceImpactWarnings"
                                checked={transactionSettings.hidePriceImpactWarnings}
                                onCheckedChange={(checked) => handleTransactionSettingChange('hidePriceImpactWarnings', checked)}
                                className="border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-full"
                            />
                            <label
                                htmlFor="hidePriceImpactWarnings"
                                className="flex-1 cursor-pointer"
                            >
                                <span className="text-sm font-medium text-foreground">Hide Price Impact Warnings</span>
                            </label>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TransactionSettings;