<?php

namespace rnwcinv\api;


class PDFApi
{
    public function GetPDF($orderId,$templateId,$mode='output')
    {
        require_once \RednaoWooCommercePDFInvoice::$DIR. 'PDFGenerator.php';
        $order=\wc_get_order($orderId);
        $generator=new \RednaoPDFGenerator(\RednaoPDFGenerator::GetPageOptionsById($templateId),false,$order);
        if(!$generator->Generate(true,true,true))
        {
            echo "Document not found!";
            return;
        }

        switch($mode){
            case 'download':
                header("Content-type: application/pdf");
                header("Content-disposition: attachment; filename=".basename($generator->GetFileName()).'.pdf');
                header('Expires: 0');
                header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
                echo $generator->GetOutput();
                break;
            case 'output':
                return $generator->GetOutput();
                break;
            case 'display':
                header("Content-type: application/pdf");
                header("Content-disposition: inline; filename=".basename($generator->GetFileName()).'.pdf');
                header('Expires: 0');
                header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
                echo $generator->GetOutput();
                break;
            default:
                throw new \Exception('Unknown mode');
        }



    }
}