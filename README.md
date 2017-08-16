## 可以放置多个小程序，并且通过gulp进行文件管理;只是方便些less  
## 使用步骤  

**git clone git@github.com:Heyff12/xiaochengxuProject.git **   
**cd  xiaochengxuProject **     
**npm install **        
**开发——npm run dev **        
**发布——npm run build **   

## 注意事项  
**备注，当需要在less文件引入其他文件时：例如@import '../../app.less';分号一定要存在，否则编译报错； **   
**由于less编译会将引入的文件编译成css到当前文件中，而小程序的wxss文件不需要这个编译过程，只需要 变成@import '../../app.wxss'; **   
**所以通过replace进行文字替换；在less文件中，引入的文件需要这样写：/**@import '../../app.less';**/，如果用//屏蔽，则编译不识别；编译后的内容就是@import '../../app.wxss'; **   

**如果有已经引入的less文件，后面不需要了，请用//做屏蔽，否则会再次被引入  **   



