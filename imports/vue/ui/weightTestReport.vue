<template>
    <div class="co-weightTest-report">
        <span slot="content" v-if="weightTestData">
            <span slot="content">
                        <br>
                        <div class="title" style="border-bottom: 0px !important;">
                            <div style="width: 100%">
                                 <div style="width: 15%;float: right">
                                    <img src="/labell.jpg" alt="" style="width: 60px;height: 60px;">
                                </div>
                                <div style="width: 85%;">
                                        <div class="title1">
                                            <span class="convertToWhite" style="font-size: 18px !important;">បន្ទប់ពិគ្រោះព្យាបាលជំងឺ និង ឡាស៊ែរថែរក្សាសម្ផស្ស </span><span
                                                style="font-family: 'Khmer OS Moul';font-size: 22px"> ឡាបែល</span>
                                        </div>
                                        <div class="title3">
                                            <span class="convertToWhite">{{addressName}}  (ខាងកើតលោកតាដំបងក្រញ៉ូង ២០០ម)</span><br>
                                            <span class="convertToWhite">077/086 55 45 65/ 012 64 44 97 (ជាប់ក្លោងទ្វាធំ បុរីរតនៈ)​</span>

                                        </div>
                                </div>

                            </div>

                        </div>

                        <div style="width: 100%;height: 25px">
                            <div style="width: 10%;float: left">
                                <span class="convertToWhite">No</span>
                            </div>
                            <div style="width: 25%;float: left">
                                <span class="convertToWhite">Name/ID</span>
                            </div>
                            <div style="width: 10%;float: left">
                                <span class="convertToWhite">Gender</span>
                            </div>
                            <div style="width: 10%;float: left">
                                <span class="convertToWhite">Age</span>
                            </div>
                            <div style="width: 10%;float: left">
                                <span class="convertToWhite">Height</span>
                            </div>
                            <div style="width: 20%;float: left">
                                <span class="convertToWhite">Date/Time</span>
                            </div>
                            <div style="width: 15%;float: left">
                                <span class="convertToWhite"></span>
                            </div>
                        </div>
                        <div style="width: 100%;height: 25px">
                            <div style="width: 10%;float: left">
                                <span>{{weightTestData.id}}</span>
                            </div>
                            <div style="width: 25%;float: left">
                                <span>{{weightTestData.patientDoc.khName}}</span>
                            </div>
                            <div style="width: 10%;float: left">
                                <span>{{weightTestData.sex}}</span>
                            </div>
                            <div style="width: 10%;float: left">
                                <span>{{weightTestData.age}}</span>
                            </div>
                            <div style="width: 10%;float: left">
                                <span>{{weightTestData.height}}</span>
                            </div>
                            <div style="width: 20%;float: left">
                                <span>{{weightTestData.date}}</span>
                            </div>
                            <div style="width: 15%;float: left">
                                <span></span>
                            </div>
                        </div>

                        <div style="width: 100%">
                            <div style="width: 57%;float: left">
                                  <div>
                                        <span class="convertToWhite"><div class="temp-no-print"
                                                                          style="float: left"></div>
                                            <img src="/one.png" alt=""> Body Composition</span>
                                  </div>
<table class="change ui celled table sizeFont" style="border: 0px !important;">
  <thead>
  <tr>
     <th style="border: 0px !important;"></th>
     <th style="border: 0px !important;"><span class="convertToWhite">Value</span></th>
     <th style="border: 0px !important;"><span class="convertToWhite">FFM(kg)</span></th>
     <th style="border: 0px !important;"><span class="convertToWhite">Weight(kg)</span></th>
     <th style="border: 0px !important;"><span class="convertToWhite">Normal range</span></th>
  </tr></thead>
  <tbody>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">ជាតិទឹកក្នុងរាងកាយ kg</span></th>
        <td style="border: 0px !important;">{{weightTestData.bodyElementsAnalysis.waterC}}</td>
        <td style="border: 0px !important;"></td>
        <td style="border: 0px !important;"></td>
        <td style="border: 0px !important;">{{weightTestData.bodyElementsAnalysis.waterCNormal}}</td>
    </tr>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">ជាតិសាច់ kg</span></th>
        <td style="border: 0px !important;">{{weightTestData.bodyElementsAnalysis.protein}}</td>
        <td style="border: 0px !important;"></td>
        <td style="border: 0px !important;"></td>
        <td style="border: 0px !important;">{{weightTestData.bodyElementsAnalysis.proteinNormal}}</td>
    </tr>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">អំបិលខនិជ kg</span></th>
        <td style="border: 0px !important;">{{weightTestData.bodyElementsAnalysis.inoSalt}}</td>
        <td style="border: 0px !important;"></td>
        <td style="border: 0px !important;"></td>
        <td style="border: 0px !important;">{{weightTestData.bodyElementsAnalysis.inoSaltNormal}}</td>
    </tr>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">ខ្លាញ់ kg</span></th>
        <td style="border: 0px !important;">{{weightTestData.bodyElementsAnalysis.bodyFat}}</td>
        <td style="border: 0px !important;"></td>
        <td style="border: 0px !important;">{{weightTestData.bodyElementsAnalysis.weight}}</td>
        <td style="border: 0px !important;">{{weightTestData.bodyElementsAnalysis.bodyFatNormal}}</td>
    </tr>

  </tbody>
</table>
                            <div>
                                <span class="convertToWhite"><div class="temp-no-print" style="float: left"></div><img
                                        src="/two.png" alt=""> Muscle fat</span>
                            </div>
<table class="change ui celled table sizeFont" style="border: 0px !important;">
  <thead>
  <tr>
     <th style="border: 0px !important;"></th>
     <th style="border: 0px !important;"><span class="convertToWhite">Under</span></th>
     <th style="border: 0px !important;"><span class="convertToWhite">Normal</span></th>
     <th style="border: 0px !important;"><span class="convertToWhite">Over</span></th>
     <th style="border: 0px !important;"><span class="convertToWhite">Normal range</span></th>
  </tr></thead>
  <tbody>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">ទំងន់ kg</span></th>
        <td style="border: 0px !important;">{{weightTestData.muscleFatAnalysis.weightUnder}}</td>
        <td style="border: 0px !important;">{{weightTestData.muscleFatAnalysis.weightFit}}</td>
        <td style="border: 0px !important;">{{weightTestData.muscleFatAnalysis.weightOver}}</td>
        <td style="border: 0px !important;">{{weightTestData.muscleFatAnalysis.weightNormal}}</td>
    </tr>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">សាច់ដុំឆ្អឹង kg</span></th>
        <td style="border: 0px !important;">{{weightTestData.muscleFatAnalysis.skeletalUnder}}</td>
        <td style="border: 0px !important;">{{weightTestData.muscleFatAnalysis.skeletalFit}}</td>
        <td style="border: 0px !important;">{{weightTestData.muscleFatAnalysis.skeletalOver}}</td>
        <td style="border: 0px !important;">{{weightTestData.muscleFatAnalysis.skeletalNormal}}</td>
    </tr>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">ខ្លាញ់ kg</span></th>
        <td style="border: 0px !important;">{{weightTestData.muscleFatAnalysis.bodyFatUnder}}</td>
        <td style="border: 0px !important;">{{weightTestData.muscleFatAnalysis.bodyFatFit}}</td>
        <td style="border: 0px !important;">{{weightTestData.muscleFatAnalysis.bodyFatOver}}</td>
        <td style="border: 0px !important;">{{weightTestData.muscleFatAnalysis.bodyFatNormal}}</td>
    </tr>


  </tbody>
</table>
                      <div>
                                <span class="convertToWhite"><div class="temp-no-print" style="float: left"></div><img
                                        src="/three.png" alt=""> Analysis of obesity</span>
                      </div>
<table class="change ui celled table sizeFont" style="border: 0px !important;">
  <thead>
  <tr>
     <th style="border: 0px !important;"></th>
     <th style="border: 0px !important;"><span class="convertToWhite">Under</span></th>
     <th style="border: 0px !important;"><span class="convertToWhite">Normal</span></th>
     <th style="border: 0px !important;"><span class="convertToWhite">Over</span></th>
     <th style="border: 0px !important;"><span class="convertToWhite">Normal range</span></th>
  </tr></thead>
  <tbody>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">BMI (kg/m<sup>2</sup>)</span></th>
        <td style="border: 0px !important;">{{weightTestData.obesityAnalysis.bmiUnder}}</td>
        <td style="border: 0px !important;">{{weightTestData.obesityAnalysis.bmiFit}}</td>
        <td style="border: 0px !important;">{{weightTestData.obesityAnalysis.bmiOver}}</td>
        <td style="border: 0px !important;">{{weightTestData.obesityAnalysis.bmiNormal}}</td>
    </tr>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">ខ្លាញ់ក្បាលពោះ (%)</span></th>
        <td style="border: 0px !important;">{{weightTestData.obesityAnalysis.bodyFatPercentUnder}}</td>
        <td style="border: 0px !important;">{{weightTestData.obesityAnalysis.bodyFatPercentFit}}</td>
        <td style="border: 0px !important;">{{weightTestData.obesityAnalysis.bodyFatPercentOver}}</td>
        <td style="border: 0px !important;">{{weightTestData.obesityAnalysis.bodyFatPercentNormal}}</td>
    </tr>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">ខ្លាញ់ត្រគាក (%)</span></th>
        <td style="border: 0px !important;">{{weightTestData.obesityAnalysis.waistHipFatRateUnder}}</td>
        <td style="border: 0px !important;">{{weightTestData.obesityAnalysis.waistHipFatRateFit}}</td>
        <td style="border: 0px !important;">{{weightTestData.obesityAnalysis.waistHipFatRateOver}}</td>
        <td style="border: 0px !important;">{{weightTestData.obesityAnalysis.waistHipFatRateNormal}}</td>
    </tr>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">ជាតិទឹក (%)</span></th>
        <td style="border: 0px !important;">{{weightTestData.obesityAnalysis.waterRateUnder}}</td>
        <td style="border: 0px !important;">{{weightTestData.obesityAnalysis.waterRateFit}}</td>
        <td style="border: 0px !important;">{{weightTestData.obesityAnalysis.waterRateOver}}</td>
        <td style="border: 0px !important;">{{weightTestData.obesityAnalysis.waterRateNormal}}</td>
    </tr>


  </tbody>
</table>


                                  <div style="height: 100px">
                                      <span class="convertToWhite">
                                          Note:<br>
                                            "C" Shows the body is high in fat and low in muscle, which means the health status is not good.<br>
                                          "D" shows that the body is with good muscle and suitable fat, which mean the health status is good.
                                      </span>
                                  </div>

        <div>
                                <span class="convertToWhite"><div class="temp-no-print" style="float: left"> </div><img
                                        src="/four.png" alt=""> Obesity diagnosis</span>
                      </div>
<table class="change ui celled table sizeFont" style="border: 0px !important;">
  <thead>
  <tr style="padding: 0px !important;">
     <th style="border: 0px !important;height: 100px !important;padding: 0px !important;" colspan="9"><span
             class="convertToWhite"><img
             src="/fat.png" alt=""
             style="width: 100%; height: 80px"></span></th>
  </tr>
  </thead>
  <tbody>
    <tr style="border: 0px !important;padding: 0px !important;">
        <td style="border: 0px !important; text-align: center;padding: 0px !important;"><i
                v-if="weightTestData.obesityAnalysis2.bodyShape1"
                class="el-icon-check"></i></td>
        <td style="border: 0px !important; text-align: center;padding: 0px !important;"><i
                v-if="weightTestData.obesityAnalysis2.bodyShape2"
                class="el-icon-check"></i></td>
        <td style="border: 0px !important; text-align: center;padding: 0px !important;"><i
                v-if="weightTestData.obesityAnalysis2.bodyShape3"
                class="el-icon-check"></i></td>
        <td style="border: 0px !important; text-align: center;padding: 0px !important;"><i
                v-if="weightTestData.obesityAnalysis2.bodyShape4"
                class="el-icon-check"></i></td>
        <td style="border: 0px !important; text-align: center;padding: 0px !important;"><i
                v-if="weightTestData.obesityAnalysis2.bodyShape5"
                class="el-icon-check"></i></td>
        <td style="border: 0px !important; text-align: center;padding: 0px !important;"><i
                v-if="weightTestData.obesityAnalysis2.bodyShape6"
                class="el-icon-check"></i></td>
        <td style="border: 0px !important; text-align: center;padding: 0px !important;"><i
                v-if="weightTestData.obesityAnalysis2.bodyShape7"
                class="el-icon-check"></i></td>
        <td style="border: 0px !important; text-align: center;padding: 0px !important;"><i
                v-if="weightTestData.obesityAnalysis2.bodyShape8"
                class="el-icon-check"></i></td>
        <td style="border: 0px !important; text-align: center;padding: 0px !important;"><i
                v-if="weightTestData.obesityAnalysis2.bodyShape9"
                class="el-icon-check"></i></td>
    </tr>
    <tr style="border: 0px !important;word-wrap:break-word;">
     <th style="border: 0px !important;text-align: center" width="11%"><span
             class="convertToWhite">Over Slim</span></th>
     <th style="border: 0px !important;text-align: center" width="11%"><span class="convertToWhite">Slightly Slim</span></th>
     <th style="border: 0px !important;text-align: center" width="11%"><span class="convertToWhite">Normal</span></th>
     <th style="border: 0px !important;text-align: center" width="11%"><span class="convertToWhite">Low Muscular</span></th>
     <th style="border: 0px !important;text-align: center" width="11%"><span class="convertToWhite">High fat</span></th>
     <th style="border: 0px !important;text-align: center" width="11%"><span class="convertToWhite">Over Muscular</span></th>
     <th style="border: 0px !important;text-align: center" width="11%"><span
             class="convertToWhite">Slightly over weight</span></th>
     <th style="border: 0px !important;text-align: center" width="11%"><span class="convertToWhite">Fat</span></th>
     <th style="border: 0px !important;text-align: center" width="11%"><span class="convertToWhite">Over Fat</span></th>
    </tr>
  </tbody>
</table>





                            </div>
                            <div style="width: 43%;float: left">

                                 <div>
                                    <span class="convertToWhite"><div class="temp-no-print"
                                                                      style="float: left"></div><img src="/five.png"
                                                                                                     alt=""> Comprehensive assessment</span>
                                 </div>
<table class="change ui celled table sizeFont" style="border: 0px !important;">
  <tbody>
    <tr style="border: 0px !important;">
        <td colspan="4" style="border: 0px !important;"><span class="convertToWhite">Nutritional assessment</span></td>
    </tr>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">ជាតិសាច់</span></th>
        <td style="border: 0px !important;"
            v-if="weightTestData.nutritionalAssessment.proteinNormal"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--<i
                class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Normal</span></td>
        <td style="border: 0px !important;"
            v-if="!weightTestData.nutritionalAssessment.proteinNormal"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--&nbsp;&nbsp;&nbsp;-->Normal</span></td>

        <td style="border: 0px !important;" v-if="weightTestData.nutritionalAssessment.proteinLack"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--<i
                class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Lack</span></td>
        <td style="border: 0px !important;"
            v-if="!weightTestData.nutritionalAssessment.proteinLack"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--&nbsp;&nbsp;&nbsp;-->Lack</span></td>

        <td style="border: 0px !important;" v-if="weightTestData.nutritionalAssessment.proteinExcessive"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--<i
                class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Excessive</span></td>
        <td style="border: 0px !important;"
            v-if="!weightTestData.nutritionalAssessment.proteinExcessive"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--&nbsp;&nbsp;&nbsp;-->Excessive</span></td>

    </tr>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">អំបិលខនិជ</span></th>
        <td style="border: 0px !important;" v-if="weightTestData.nutritionalAssessment.inorganicNormal"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--<i
                class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Normal</span></td>
        <td style="border: 0px !important;" v-if="!weightTestData.nutritionalAssessment.inorganicNormal"><img
                class="temp-no-print"
                src="/box.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--&nbsp;&nbsp;&nbsp;-->Normal</span></td>

        <td style="border: 0px !important;"
            v-if="weightTestData.nutritionalAssessment.inorganicLack"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--<i
                class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Lack</span></td>
        <td style="border: 0px !important;"
            v-if="!weightTestData.nutritionalAssessment.inorganicLack"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--&nbsp;&nbsp;&nbsp;-->Lack</span></td>

        <td style="border: 0px !important;"
            v-if="weightTestData.nutritionalAssessment.inorganicExcessive"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--<i
                class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Excessive</span></td>
        <td style="border: 0px !important;"
            v-if="!weightTestData.nutritionalAssessment.inorganicExcessive"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--&nbsp;&nbsp;&nbsp;-->Excessive</span></td>
    </tr>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">ខ្លាញ់</span></th>
       <td style="border: 0px !important;" v-if="weightTestData.nutritionalAssessment.fatNormal"> <img
               class="temp-no-print"
               src="/checkbox.png"
               style="width: 15px;height: 15px"
               alt=""> <span
               class="convertToWhite fontTd"><!--<i
               class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Normal</span></td>
        <td style="border: 0px !important;" v-if="!weightTestData.nutritionalAssessment.fatNormal"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--&nbsp;&nbsp;&nbsp;-->Normal</span></td>

        <td style="border: 0px !important;" v-if="weightTestData.nutritionalAssessment.fatLack"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--<i
                class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Lack</span></td>
        <td style="border: 0px !important;" v-if="!weightTestData.nutritionalAssessment.fatLack"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--&nbsp;&nbsp;&nbsp;-->Lack</span></td>

        <td style="border: 0px !important;"
            v-if="weightTestData.nutritionalAssessment.fatExcessive"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--<i
                class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Excessive</span></td>
        <td style="border: 0px !important;"
            v-if="!weightTestData.nutritionalAssessment.fatExcessive"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--&nbsp;&nbsp;&nbsp;-->Excessive</span></td>
    </tr>
  </tbody>
</table>

<table class="change ui celled table sizeFont" style="border: 0px !important;">
  <tbody>
    <tr style="border: 0px !important;">
        <td colspan="4" style="border: 0px !important;"><span class="convertToWhite">Weight assessment</span></td>
    </tr>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">ទំងន់</span></th>

         <td style="border: 0px !important;" v-if="weightTestData.weightAssessment.weightNormal"> <img
                 class="temp-no-print"
                 src="/checkbox.png"
                 style="width: 15px;height: 15px"
                 alt=""> <span
                 class="convertToWhite fontTd"><!--<i
                 class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Normal</span></td>
        <td style="border: 0px !important;" v-if="!weightTestData.weightAssessment.weightNormal"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--&nbsp;&nbsp;&nbsp;-->Normal</span></td>

        <td style="border: 0px !important;" v-if="weightTestData.weightAssessment.weightUnder"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--<i
                class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Under</span></td>
        <td style="border: 0px !important;" v-if="!weightTestData.weightAssessment.weightUnder"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--&nbsp;&nbsp;&nbsp;-->Under</span></td>

        <td style="border: 0px !important;" v-if="weightTestData.weightAssessment.weightExcessive"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--<i
                class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Excessive</span></td>
        <td style="border: 0px !important;" v-if="!weightTestData.weightAssessment.weightExcessive"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--&nbsp;&nbsp;&nbsp;-->Excessive</span></td>
    </tr>
    <tr style="border: 0px !important;">

        <th style="border: 0px !important;"><span class="convertToWhite">សាច់ដុំ</span></th>
         <td style="border: 0px !important;" v-if="weightTestData.weightAssessment.muscleNormal"> <img
                 class="temp-no-print"
                 src="/checkbox.png"
                 style="width: 15px;height: 15px"
                 alt=""> <span
                 class="convertToWhite fontTd"><!--<i
                 class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Normal</span></td>
        <td style="border: 0px !important;" v-if="!weightTestData.weightAssessment.muscleNormal"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--&nbsp;&nbsp;&nbsp;-->Normal</span></td>

        <td style="border: 0px !important;" v-if="weightTestData.weightAssessment.muscleUnder"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--<i
                class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Under</span></td>
        <td style="border: 0px !important;" v-if="!weightTestData.weightAssessment.muscleUnder"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--&nbsp;&nbsp;&nbsp;-->Under</span></td>

        <td style="border: 0px !important;" v-if="weightTestData.weightAssessment.muscleExcessive"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--<i
                class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Excessive</span></td>
        <td style="border: 0px !important;" v-if="!weightTestData.weightAssessment.muscleExcessive"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--&nbsp;&nbsp;&nbsp;-->Excessive</span></td>

    </tr>
    <tr style="border: 0px !important;">

        <th style="border: 0px !important;"><span class="convertToWhite">ខ្លាញ់</span></th>

         <td style="border: 0px !important;" v-if="weightTestData.weightAssessment.bodyFatNormal"> <img
                 class="temp-no-print"
                 src="/checkbox.png"
                 style="width: 15px;height: 15px"
                 alt=""> <span
                 class="convertToWhite fontTd"><!--<i
                 class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Normal</span></td>
        <td style="border: 0px !important;" v-if="!weightTestData.weightAssessment.bodyFatNormal"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--&nbsp;&nbsp;&nbsp;-->Normal</span></td>

        <td style="border: 0px !important;" v-if="weightTestData.weightAssessment.bodyFatUnder"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--<i
                class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Under</span></td>
        <td style="border: 0px !important;" v-if="!weightTestData.weightAssessment.bodyFatUnder"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--&nbsp;&nbsp;&nbsp;-->Under</span></td>

        <td style="border: 0px !important;" v-if="weightTestData.weightAssessment.bodyFatExcessive"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--<i
                class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Excessive</span></td>
        <td style="border: 0px !important;"
            v-if="!weightTestData.weightAssessment.bodyFatExcessive"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 15px;height: 15px"
                alt=""> <span
                class="convertToWhite fontTd"><!--&nbsp;&nbsp;&nbsp;-->Excessive</span></td>

    </tr>
  </tbody>
</table>

<table class="change ui celled table sizeFont" style="border: 0px !important;">
  <tbody>
    <tr style="border: 0px !important;">
        <td colspan="4" style="border: 0px !important;"><span class="convertToWhite">Obesity assessment</span></td>
    </tr>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">BMI</span></th>

        <td style="border: 0px !important;" v-if="weightTestData.obesityAnalysis2.bmiNormal"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 12px;height: 12px"
                alt=""> <span
                class="convertToWhite fontTd2"><!--<i
                class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Normal</span></td>
        <td style="border: 0px !important;" v-if="!weightTestData.obesityAnalysis2.bmiNormal"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 12px;height: 12px"
                alt=""> <span
                class="convertToWhite fontTd2"><!--&nbsp;&nbsp;&nbsp;-->Normal</span></td>

        <td style="border: 0px !important;" v-if="weightTestData.obesityAnalysis2.bmiUnder"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 12px;height: 12px"
                alt=""> <span
                class="convertToWhite fontTd2"><!--<i
                class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Under</span></td>
        <td style="border: 0px !important;" v-if="!weightTestData.obesityAnalysis2.bmiUnder"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 12px;height: 12px"
                alt=""> <span
                class="convertToWhite fontTd2"><!--&nbsp;&nbsp;&nbsp;-->Under</span></td>

        <td style="border: 0px !important;" v-if="weightTestData.obesityAnalysis2.bmiExcessive"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 12px;height: 12px"
                alt=""> <span
                class="convertToWhite fontTd2"><!--<i
                class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Excessive</span></td>
        <td style="border: 0px !important;" v-if="!weightTestData.obesityAnalysis2.bmiExcessive"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 12px;height: 12px"
                alt=""> <span
                class="convertToWhite fontTd2"><!--&nbsp;&nbsp;&nbsp;-->Excessive</span></td>

    </tr>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">PBF</span></th>

        <td style="border: 0px !important;" v-if="weightTestData.obesityAnalysis2.bodyFatPNormal"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 12px;height: 12px"
                alt="">
            <span
                    class="convertToWhite fontTd2"><!--<i
                    class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Normal</span></td>
        <td style="border: 0px !important;" v-if="!weightTestData.obesityAnalysis2.bodyFatPNormal"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 12px;height: 12px"
                alt=""> <span
                class="convertToWhite fontTd2"><!--&nbsp;&nbsp;&nbsp;-->Normal</span></td>

        <td style="border: 0px !important;" v-if="weightTestData.obesityAnalysis2.bodyFatPThin"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 12px;height: 12px"
                alt=""> <span
                class="convertToWhite fontTd2"><!--<i
                class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Thin</span></td>
        <td style="border: 0px !important;" v-if="!weightTestData.obesityAnalysis2.bodyFatPThin"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 12px;height: 12px"
                alt=""> <span
                class="convertToWhite fontTd2"><!--&nbsp;&nbsp;&nbsp;-->Thin</span></td>

        <td style="border: 0px !important;" v-if="weightTestData.obesityAnalysis2.bodyFatPFat"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 12px;height: 12px"
                alt=""> <span
                class="convertToWhite fontTd2"><!--<i
                class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Fat</span></td>
        <td style="border: 0px !important;" v-if="!weightTestData.obesityAnalysis2.bodyFatPFat"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 12px;height: 12px"
                alt=""> <span
                class="convertToWhite fontTd2"><!--&nbsp;&nbsp;&nbsp;-->Fat</span></td>


        <td style="border: 0px !important;" v-if="weightTestData.obesityAnalysis2.bodyFatPSevereObesity"> <img
                class="temp-no-print"
                src="/checkbox.png"
                style="width: 12px;height: 12px"
                alt=""> <span
                class="convertToWhite fontTd2"><!--<i
                class="el-icon-check convetToTransparent" style="width:20px !important;height:20px !important;"></i>-->Severe obesity</span></td>
        <td style="border: 0px !important;"
            v-if="!weightTestData.obesityAnalysis2.bodyFatPSevereObesity"> <img
                class="temp-no-print"
                src="/box.png"
                style="width: 12px;height: 12px"
                alt=""> <span
                class="convertToWhite fontTd2"><!--&nbsp;&nbsp;&nbsp;-->Severe obesity</span></td>

    </tr>
  </tbody>
</table>

<div>
    <span class="convertToWhite"><div class="temp-no-print" style="float: left"></div><img src="/six.png" alt=""> Weight control</span>
</div>

<table class="change ui celled table sizeFont" style="border: 0px !important;">
  <tbody>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">ទំងន់ស្តង់ដា</span></th>
        <td style="border: 0px !important;">{{weightTestData.weightControl.targetWeight}}</td>
        <td style="border: 0px !important;"><span class="convertToWhite">kg</span></td>
    </tr>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">តុល្យភាពទំងន់</span></th>
        <td style="border: 0px !important;">{{weightTestData.weightControl.weightControl}}</td>
        <td style="border: 0px !important;"><span class="convertToWhite">kg</span></td>
    </tr>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">តុល្យភាពខ្លាញ់</span></th>
        <td style="border: 0px !important;">{{weightTestData.weightControl.fatControl}}</td>
        <td style="border: 0px !important;"><span class="convertToWhite">kg</span></td>
    </tr>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">តុល្យភាពសាច់</span></th>
        <td style="border: 0px !important;">{{weightTestData.weightControl.muscleControl}}</td>
        <td style="border: 0px !important;"><span class="convertToWhite">kg</span></td>
    </tr>
    <tr style="border: 0px !important;">
        <th style="border: 0px !important;"><span class="convertToWhite">តម្រូវការប្រចាំថ្ងៃ</span></th>
        <td style="border: 0px !important;">{{weightTestData.weightControl.basalMet}}</td>
        <td style="border: 0px !important;"><span class="convertToWhite">kcal</span></td>
    </tr>

  </tbody>
</table>


<table class="change ui celled table sizeFont" style="border: 0px !important;">
  <tbody>
    <tr style="border: 0px !important;">
        <td style="border: 0px !important;"><span class="convertToWhite">Health assessment</span></td>
        <td style="border: 0px !important;">{{weightTestData.health}}</td>
        <td style="border: 0px !important;"><span class="convertToWhite">fen</span></td>
    </tr>
  </tbody>
</table>



<div>
    <span class="convertToWhite"><div class="temp-no-print" style="float: left"></div><img src="/seven.png" alt=""> Bioelectrical impedance</span>
</div>

<table class="change ui celled table sizeFont" style="border: 0px !important;">
  <tbody>
    <tr style="border: 0px !important;">
        <td style="border: 0px !important;"><span class="convertToWhite">Z</span></td>
        <td style="border: 0px !important;"><span class="convertToWhite">RA</span></td>
        <td style="border: 0px !important;"><span class="convertToWhite">LA</span></td>
        <td style="border: 0px !important;"><span class="convertToWhite">TR</span></td>
        <td style="border: 0px !important;"><span class="convertToWhite">RL</span></td>
        <td style="border: 0px !important;"><span class="convertToWhite">LL</span></td>
    </tr>

    <tr style="border: 0px !important;">
        <td style="border: 0px !important;"><span class="convertToWhite">20kHz</span></td>
        <td style="border: 0px !important;">{{weightTestData.bioimpedance.ra20}}</td>
        <td style="border: 0px !important;">{{weightTestData.bioimpedance.la20}}</td>
        <td style="border: 0px !important;">{{weightTestData.bioimpedance.tr20}}</td>
        <td style="border: 0px !important;">{{weightTestData.bioimpedance.rl20}}</td>
        <td style="border: 0px !important;">{{weightTestData.bioimpedance.ll20}}</td>

    </tr>

    <tr style="border: 0px !important;">
        <td style="border: 0px !important;"><span class="convertToWhite">50kHz</span></td>
        <td style="border: 0px !important;">{{weightTestData.bioimpedance.ra50}}</td>
        <td style="border: 0px !important;">{{weightTestData.bioimpedance.la50}}</td>
        <td style="border: 0px !important;">{{weightTestData.bioimpedance.tr50}}</td>
        <td style="border: 0px !important;">{{weightTestData.bioimpedance.rl50}}</td>
        <td style="border: 0px !important;">{{weightTestData.bioimpedance.ll50}}</td>

    </tr>

    <tr style="border: 0px !important;">
        <td style="border: 0px !important;"><span class="convertToWhite">100kHz</span></td>
         <td style="border: 0px !important;">{{weightTestData.bioimpedance.ra100}}</td>
        <td style="border: 0px !important;">{{weightTestData.bioimpedance.la100}}</td>
        <td style="border: 0px !important;">{{weightTestData.bioimpedance.tr100}}</td>
        <td style="border: 0px !important;">{{weightTestData.bioimpedance.rl100}}</td>
        <td style="border: 0px !important;">{{weightTestData.bioimpedance.ll100}}</td>

    </tr>
  </tbody>
</table>



                            </div>
                        </div>



            </span>
        </span>
        <!--<div class="convertToWhite" style="text-align: center;float: left">
            ផ្ទះលេខ ៤-៥ ភូមិ រំចេក៤ សង្កាត់ រតនះ ក្រុង បាត់ដំបង ខេត្ត បាត់ដំបង (ខាងកើតលោកតាដំបងក្រញ៉ូង ២០០ម) <br>
            077/086 55 45 65/ 012 64 44 97 (ជាប់ក្លោងទ្វាធំ បុរីរតនៈ)​
        </div>-->

    </div>
</template>
<script>
    export default {
        data() {
            return {
                weightTestReport: {
                    roleBranchOptionsModel: [],
                    roleAreaOptionsModel: [],
                    dateAs: ""
                },

                roleBranchOptions: [],
                roleAreaOptions: [],

                dateAs: "",
                activeName: "1",
                weightTestData: {},
                loading: false,

                companyName: "",
                companyEnName: "",
                addressName: "",

                branchHeader: "All",
                dateHeader: "All",

                printLoading: false,
            }
        },
        methods: {
            fetchBranchOption() {
                Meteor.call("fetchRolesBranch", Meteor.userId(), (err, result) => {
                    this.roleBranchOptions = result;
                })
            },
            fetchAreaOption(val) {
                Meteor.call("fetchRolesAreaByMultiRoleBranch", Meteor.userId(), val, (err, result) => {
                    this.roleAreaOptions = result;
                })
            },

            handleRunReport() {
                let params = {};
                params._id = FlowRouter.getParam("weightTestId");

                Meteor.call('giveMeWeightTestReport', params, (err, result) => {
                    if (!err) {
                        this.weightTestData = result;
                    }
                    this.loading = false;
                });


            },
            getCompany() {
                Meteor.call("getCompany", (err, result) => {
                    if (!err) {
                        this.companyName = result.khName;
                        this.companyEnName = result.enName;
                        this.addressName = result.khAddress;
                    }
                })

            },
            PrintReport() {
                window.print();
            }
        },
        watch: {
            "weightTestReport.roleBranchOptionsModel"(val) {
                this.fetchAreaOption(val);
            }
            ,
            "weightTestReport.roleAreaOptionsModel"(val) {
                this.fetchPatientOption(val);
            }
        },
        created() {
            this.getCompany();
            this.handleRunReport()
        },
        computed: {
            dataExist() {
                return this.weightTestData.data > 0;
            }
        },

    }
</script>


<style scope>
    @page {
        /*size: A4 landscape;*/
        size: A4;
        max-height: 100%;
        width: 100%;
        margin: 0;
    }

    @media print {
        html, body {
            /*width: 297mm;*/
            height: auto;
            width: 100%;
            left: 0;
            right: 0;
            top: 0;
        }

        /*.convertToWhite {
            color: transparent;
        }*/
        /*.convetToTransparent {
            color: black !important;
        }*/

    }

    .el-table {
        font-size: 12px !important;
    }

    .el-table td {
        padding: 1px !important;
        margin: 1px !important;
    }

    .el-table th {
        padding: 1px !important;
        text-align: center !important;
    }

    .el-table .cell {
        padding-left: 3px;
        padding-right: 3px;
    }

    .convetToTransparent {
        color: transparent;
    }

    .sizeFont {
        font-size: 11px !important;
    }

    /*table {
        width:100%;
        table-layout:fixed;

    }
    td {
        word-wrap:break-word;
    }*/

    .fontTd {
        font-size: 11px !important;
    }

    .fontTd2 {
        font-size: 8px !important;
    }

    .change.ui.table td {
        font-size: 11px !important;
    }


</style>