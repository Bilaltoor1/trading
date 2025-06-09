'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SendTokenSelector from './SendTokenSelectorDialog';

const SendToken = ({ label, selectedToken, onTokenSelect, quickSelectTokens }) => {
    const hasSelectedToken = selectedToken && selectedToken.symbol && selectedToken.symbol !== '';

    return (
        <div className={`border-gray-700 relative rounded-2xl overflow-hidden backdrop-blur-sm border cursor-text hover:border-border-bright/60  p-5 transition-all duration-150`}>
            <div className='flex flex-col space-y-2'>
                <div className='flex items-center justify-between text-white'>
                    <p className="text-sm font-medium text-muted-foreground transition opacity-100">{label}</p>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='flex-1 min-w-0 mr-2'>
                        <div className='relative'>
                            <Input
                                type='number'
                                className='w-full border-0 bg-transparent text-4xl px-0 py-0 h-12 outline-none font-medium text-muted-foreground placeholder:text-muted-foreground/50 transition-colors caret-primary focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                placeholder="0"
                                style={{ fontSize: '2.25rem', lineHeight: '2.5rem' }}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col items-end'>
                        <SendTokenSelector
                            quickSelectTokens={quickSelectTokens}
                            selectedToken={selectedToken}
                            onTokenSelect={onTokenSelect}
                            hasSelectedToken={hasSelectedToken}
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">~$0</span>
                    {hasSelectedToken && (
                        <div className="flex items-center gap-2 text-gray-400">
                            <span>10.0 {selectedToken.symbol}</span>
                            <Button className="inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-5 text-xs px-1.5 font-medium bg-transparent hover:bg-gray-800 hover:text-white rounded-md transition-opacity opacity-50 cursor-not-allowed text-gray-500">Half</Button>
                            <Button className="inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-5 text-xs px-1.5 font-medium bg-transparent hover:bg-gray-800 hover:text-white rounded-md transition-opacity opacity-50 cursor-not-allowed text-gray-500">Max</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SendToken
