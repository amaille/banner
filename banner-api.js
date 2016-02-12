(function(){

     this.BannerApi = function(){            
        this.wrapper            = document.querySelector('[data-banner]');       
        this.collapseWrapper     = null;
        this.expandWrapper     = null;
        this.closeButton        = null;
        this.closeButtonClicked = false;
        this.expanded           = false;        
        this.providerUrl        = "http://developer6.r1a.eu/banner-api/";  
        this.bannerCode         = this.wrapper.getAttribute('data-banner');
        this.clientBannerProperties = {};
        this.getBannerProperties();
    };

    BannerApi.prototype = {
        getBannerProperties : function () {
            var _ = this;
            var xhr = new XMLHttpRequest();
            clientProperties = null;
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                    _.clientBannerProperties = JSON.parse(xhr.responseText);
                    _.createBanner();
               }
            }
            xhr.open('GET', this.providerUrl+this.bannerCode, true);
            xhr.send(this.bannerCode);                
        },
        createBanner : function  (){                
            this.initializeBannerElements();
            this.wrapper.style.position = 'relative';
            this.populateCollapseWrapper();
            this.attachElements();
            this.addContentEvent();
            this.addExpandWrapperEvent();
        },
        initializeBannerElements : function(){        
            this.closeButton        = document.createElement('img');
            this.collapseWrapper   = document.createElement('div');
            this.expandWrapper      = document.createElement('div');
                          
        },
        attachElements : function(){
            this.wrapper.appendChild(this.collapseWrapper);
            this.wrapper.appendChild(this.expandWrapper);
            this.expandWrapper.appendChild(this.closeButton);
        },
        addContentEvent : function (){
            var _ = this;
            this.collapseWrapper.addEventListener('click',function(){
                _.expanded = true;
                _.showHideBannerFullScreen();
                _.populateExpandWrapper();
                _.populateCloseButton();
                _.closeButtonClicked = false;
            });                        
        },
        populateExpandWrapper : function(){
            var _ = this; 
            _.expandWrapper.style.minHeight = '100%'; 
            _.expandWrapper.style.minWidth = '100%';
            _.expandWrapper.style.position = 'fixed';
            _.expandWrapper.style.top = '0px';
            _.expandWrapper.style.left = '0px';
            _.expandWrapper.style.whiteSpace = 'nowrap';    
            _.expandWrapper.style.textAlign = 'center';
            _.expandWrapper.style.background = '#1A1A1A';
            _.expandWrapper.style.zIndex = '9999';
            _.attachBannerToExpandWrapper();            
        },
        populateCollapseWrapper : function(){
            var _ = this;
            var bannerCollapse =  document.createElement('img');
            bannerCollapse.setAttribute('src',_.clientBannerProperties.bannerProperties.backgroundCollapsed);
            bannerCollapse.style.maxWidth     = '100%';
            //bannerCollapse.style.height    = _.clientBannerProperties.collapseSize.height+'px';
            bannerCollapse.style.height    = 'auto';
            _.collapseWrapper.appendChild(bannerCollapse);
            //_.collapseWrapper.style.backgroundPosition    = _.clientBannerProperties.collapseSize.position;
            //_.collapseWrapper.style.background = 'url('+_.clientBannerProperties.bannerProperties.backgroundCollapsed+') no-repeat';
            //return _.collapseWrapper;
        },
        getBannerFullScreen : function(){
            var bannerFullSize = document.createElement('img');
            bannerFullSize.setAttribute('id','bannerFullSizeId');
            bannerFullSize.setAttribute('src',this.clientBannerProperties.bannerProperties.backgroundExpanded);
            bannerFullSize.style.maxWidth = '100%';
            return bannerFullSize;
        },
        populateCloseButton : function(){            
            this.closeButton.setAttribute('src',this.clientBannerProperties.bannerProperties.closeButton);
            this.closeButton.setAttribute('id','banner-close');
            this.closeButton.style.position = 'absolute';
            this.closeButton.style.top    = '3px';
            this.closeButton.style.right  = '0px';
            this.closeButton.style.maxWidth = '100%';            
            this.addCloseButtonEvent();
        },
        addCloseButtonEvent : function(){
            var _ = this;
            this.closeButton.addEventListener('click',function(){
                _.expanded = false;
                _.showHideBannerFullScreen();
                _.closeButtonClicked = true;
            });                
        },
        showHideBannerFullScreen : function(){
            if(this.expanded){
                this.expandWrapper.style.display = 'block';
            }else{
                this.expandWrapper.style.display = 'none';
            }
        },
        testIfElementExist :function(elementId){
            var element = document.getElementById(elementId);
            return (typeof(element)!= 'undefined' && element !=null)? true : false;
        },
        attachBannerToExpandWrapper : function(){
            var _ = this;
            if(this.testIfElementExist('bannerFullSizeId')){
                return _.expandWrapper.appendChild(document.getElementById('bannerFullSizeId'));
            }else{
                return _.expandWrapper.appendChild(_.getBannerFullScreen());
            }
        },
        addExpandWrapperEvent : function (){
            var _ = this;
            this.expandWrapper.addEventListener('click',function(){
                if(! _.closeButtonClicked){
                    window.open(_.clientBannerProperties.redirectUrl, '_target');
                    _.expanded = false;
                    _.showHideBannerFullScreen();
                }
                return false;

            });                        
        }

    
        
       
    };
    new BannerApi();    
}());