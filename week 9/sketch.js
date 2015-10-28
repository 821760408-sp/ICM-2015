
var videos = [];
var gap = 0,
  posX = 0,
  posY = 0;
var playing = true;
var mode = 0;
// var fr = 30;

// drawInModeOne
var nPartition = 3;
// var borderYArr = [];

// mousePressed
var isStuck = false;
var t1 = t2 = t3 = t4 = 0.0;

function setup() {
  var canvas = createCanvas( windowWidth, windowHeight );

  for (var i = 0; i < 4; i++) {
    var video = createVideo( 'videos/93Hz.mov' );
    // var video = createVideo( 'videos/fish.mov' );
    video.volume( 0.25 );
    video.loop();
    video.hide();
    videos.push( video );
  }

  // for ( var i = 0; i < nPartition; i++ ) {
  //   borderYArr.push( floor( random( 0, videos[ i ].height ) ) );
  // }

  gap = round( min( windowWidth, windowHeight ) * 0.05 );
  posX = round( ( windowWidth - 1280 - gap ) >> 1 );
  posY = round( ( windowHeight - 720 - gap ) >> 1 );

  textSize( 16 );
}

function draw() {
  // background( 10 );
  background( 10, 10 );
  fill( 100 );
  text( "press space to pause | play", 40, 40 );
  text( "press left mouse key to glitch", 40, 60);
  
  drawVideoAsImage();

  if ( frameCount % 420 === 0 ) {
    var ind = floor( random( 4 ) );
    var ind2 = floor( random( 4 ) );
    var tempVideo = videos[ ind ];
    videos[ ind ] = videos[ ind2 ];
    videos[ ind2 ] = tempVideo;
  }

  if ( frameCount % 600 === 0 ) {
    ind = floor( random( 4 ) );
    ind2 = floor( random( 4 ) );
    tempVideo = videos[ 1 ];
    videos[ 1 ] = videos[ 3 ];
    videos[ 3 ] = tempVideo;
  }
}

function drawVideoAsImage() {
  if ( isStuck ) {
    drawStuck();
  } else {
    drawNormal();
  }

  // switch ( mode ) {
  //   case 0:
  //     image( video, posX, posY );
  //     break;
  //   case 1:
  //     drawInModeOne( video, posX, posY );
  // //     drawInModeTwo( video, posX, posY );
  //     break; 
  // }
}

function drawStuck() {
  if ( playing ) {
    // --------------------------------- 0

    if ( frameCount % 10 === 0 ) videos[ 0 ].time( t1 + cos( TWO_PI * frameCount % 60 / 60  ) );
    if ( frameCount % 60 === 59 ) t1 += random( 0.5 );
    if ( t2 >= videos[ 0 ].duration() ) t1 = 0;

    // --------------------------------- 1

    // if ( frameCount % 60 === 8 ) videos[ 1 ].time( t2 + random( -0.01, 0.125 ) );
    // else if ( frameCount % 60 === 15 ) videos[ 1 ].time( t2 + random( 0.115, 0.25 ) );
    // else if ( frameCount % 60 === 23 ) videos[ 1 ].time( t2 + random( 0.24, 0.375 ) );
    // else if ( frameCount % 60 === 30 ) videos[ 1 ].time( t2 + random( 0.365, 0.5 ) );
    // else if ( frameCount % 60 === 38 ) videos[ 1 ].time( t2 + random( 0.49, 0.625 ) );
    // else if ( frameCount % 60 === 45 ) videos[ 1 ].time( t2 + random( 0.615, 0.75 ) );
    // else if ( frameCount % 60 === 53 ) { videos[ 1 ].time( t2 + random( 0.74, 0.875 ) ); t2 += random( 0, 0.1 ); }
    // if ( t2 >= videos[ 1 ].duration() ) t2 = 0;

    if ( frameCount % 10 === 0 ) videos[ 1 ].time( t2 + random( frameCount % 60 / 60 ) );
    if ( frameCount % 60 === 59 ) t2 += random( 0.5 );
    if ( t2 >= videos[ 1 ].duration() ) t2 = 0;

    // --------------------------------- 2

    if ( frameCount % 120 === 29 ) videos[ 2 ].time( t3 + random( -0.1, 0 ) );
    else if ( frameCount % 120 === 31 ) videos[ 2 ].time( t3 + random( -0.1, 0 ) );
    else if ( frameCount % 120 === 37 ) videos[ 2 ].time( t3 + random( -0.25, 0 ) );
    else if ( frameCount % 120 === 41 ) { videos[ 2 ].time( t3 + random( -0.1, 0 ) ); t3 += random( 1 ); }
    if ( t3 >= videos[ 2 ].duration() ) t3 = 0;

    // --------------------------------- 3

    if ( frameCount % 90 === 19 ) videos[ 3 ].time( t4 + random( -0.11, 0.11 ) );
    else if ( frameCount % 90 === 23 ) videos[ 3 ].time( t4 + random( -0.11, 0.11 ) );
    else if ( frameCount % 90 === 37 ) videos[ 3 ].time( t4 + random( -0.33, 0.33 ) );
    else if ( frameCount % 90 === 57 ) { videos[ 3 ].time( t4 + random( -0.11, 0.11 ) ); t4 += random( 0.5 ); }
    if ( t4 >= videos[ 3 ].duration() ) t4 = 0;
  }

  drawNormal();
}

function drawNormal() {
  image( videos[ 0 ], posX, posY );
  image( videos[ 1 ], posX + videos[ 0 ].width + gap, posY );
  image( videos[ 2 ], posX, posY + videos[ 0 ].height + gap );
  image( videos[ 3 ], posX + videos[ 0 ].width + gap, posY + videos[ 0 ].height + gap );
}

// function drawInModeOne( video, posX, posY ) {
  // var unitX = 0;
  // // var pixels = [];
  // // video.loadPixels();
  // // pixels = video.pixels;
  // unitX = video.width / nPartition;
  // for ( var i = 0; i < nPartition; i++ ) {
  //   var borderY = borderYArr[ i ];
  //   var bottomImg = video.get( unitX * i, borderY, unitX, height - borderY );
  //   var upperImg = video.get( unitX * i, 0, unitX, borderY );
  //   if ( bottomImg instanceof p5.Image && upperImg instanceof p5.Image ) {
  //     image( bottomImg, unitX * i, 0 );
  //     image( upperImg, unitX * i, bottomImg.height );
  //   }
  // }
//   image( video, posX, posY );
// }

function mousePressed() {
  if ( playing ) {
    if ( !isStuck ) {
      t1 = videos[ 0 ].time();
      t2 = videos[ 1 ].time();
      t3 = videos[ 2 ].time();
      t4 = videos[ 3 ].time();
    }
    isStuck = !isStuck;
  }
}

function keyPressed() {
  console.log( key );
  if ( key === ' ' ) {
    if (playing)
      videos.forEach( function ( element ) { element.pause(); } );
    else
      videos.forEach( function ( element ) { element.loop(); } );
    playing = !playing; 
  }

  // if ( key === 'M') mode = ( mode + 1 ) % 2;
  // console.log( mode );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  gap = round( min( windowWidth, windowHeight ) * 0.05 );
  posX = round( ( windowWidth - ( videos[ 0 ].width << 1 ) - gap ) >> 1 );
  posY = round( ( windowHeight - ( videos[ 0 ].height << 1 ) - gap ) >> 1 );
}
