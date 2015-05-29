<?php
return array( 

    /*
    |--------------------------------------------------------------------------
    | oAuth Config
    |--------------------------------------------------------------------------
    */

    /**
     * Storage
     */
    'storage' => 'Session', 

    /**
     * Consumers
     */
    'consumers' => array(

        /**
         * Facebook
         */
        'Facebook' => array(
            'client_id'     => '151793521582103',
            'client_secret' => '55b6104f2062f88fe725dbe7920942e1',
            'scope'         => array('email'),
        ),      

    )

);