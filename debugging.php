<?php
    /*
     * This file contains all DEBUGING functions
     */

    function wl_print_var($var) 
    {
        $render_data  = '<div class="wl-debug">';
        
        if (is_array($var))
        {
            $render_data .= wl_render_var_nest($var);
        }
        else
        {
            $render_data .= '<div class="wl-debug-var">';
            $render_data .= $var;
            $render_data .= '</div>';
        }

        return $render_data . '</div>';
    }

    function wl_render_var_nest($var,$depth=0)
    {
        $render_data = '<div class="wl-debug-nest">';
        foreach ( $var as $index => $value )
        {
            $render_data .= '<div class="wl-debug-value" style="margin-left:' . $depth*10 . 'px">';
            $render_data .= '['.$index.'] : ';
            $render_data .= (is_array($value)) ? wl_render_var_nest($value,$depth+1) : $value;
            $render_data .= '</div>';
        }

        return $render_data . '</div>';
    }
?>