public subDomainUrlRegEx = /^([a-zA-Z0-9]([-a-zA-Z0-9]{0,61}[a-zA-Z0-9])?\.)([a-zA-Z0-9]([-a-zA-Z0-9]{0,252}[a-zA-Z0-9])?)\.([a-zA-Z]{2,63})([\/\w\-\.\_]+)?$/;

  public urlRegex = /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,10}(:[0-9]{1,5})?(\/.*)?$/i;

  public urlCtaRegex=/(\[[\w\._]+\])|(^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,10}(:[0-9]{1,5})?(\/.*)?$)/i;

  public urlQueryRegex = /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,10}(:[0-9]{1,5})?(\/.*)?(\?([a-z0-9]+\=[a-z0-9]*)+)?$/i;
  /* tslint:disable-next-line */
  public domiainInUrlRegex = /^(?:http|https?:\/\/)?([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?/i;
  /* tslint:disable-next-line */
  public imgDynamicUrl = /(\[\s*[\w\._]+\s*\])|(\{\{\s*[\w\._]+\s*\}\})|(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?(?:jpe?g|png)/i;
  public allSupportedImgRegex = /(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?(?:jpe?g|gif|png)/;
  public imgNonGifImage = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?(?:jpe?g|png)/;
  /*Returns 'RegExp' which matches jpeg, jpg, png url only start with https:: */
  public httpsImgNonGifImage = /(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?(?:jpe?g|png)/;
  public gifUrlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?(?:gif)/;
  public imgPersonalizeUrl = /(\[[\w\._]+\])|(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?(?:jpe?g|png)/i;

  // public inputRegex = /^[a-zA-Z0-9 _.@:\[\"\]'\\/-\{\}]*$/;  // OLD Regex changes due to (-) support not working
  public inputRegex = /^[a-zA-Z0-9 \-_.,@:'\[\"\]\/\{\}]*$/;
  public scriptRegex = /(<script)|(<\/script>)|<\/script/gi;
  public audioUrlRegex = /^(http|https):\/\/(.+)\.(mp3|aiff|wav)$/i;
  public soundFileRegExAndroid = /.(mp3|ogg|wav)$/i;
  public soundFileRegExiOS = /.(caf|aiff|wav)$/i;
  public videoUrlRegex = /^(http|https):\/\/(.+)\.(m4v|mp4|mov)$/i;
  public campaignNameTitle = /^[a-zA-Z0-9-_&@:?\s]+$/;
  public regexForInteger = /^\d*$/;
  public numbersWithComma = /^[0-9,]*$/;
  private numbersWithoutDot = /^(?!.*\.)(?=.*[0-9]).+$/;
  public emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
