<?xml version="1.0" encoding = "UTF-8"?>
<xsl:stylesheet xmlns:xsl= "http://www.w3.org/1999/XSL/Transform" version ="1.0">


  <xsl:output method="html" encoding="UTF-8"/>

  <xsl:template match ="qcm">
    <html>
      <body>
	<form method="post" action="correction.php">
	  <h1>Un questionaire sur <xsl:value-of select="@matiere"/></h1>
	  <xsl:apply-templates select="child::question"/>
	  <input type="submit" name="ok" value="ok"/><br/>
	</form>
      </body>
    </html>
  </xsl:template>


  <xsl:template match ="question">
    
    <xsl:apply-templates select="child::libelle"/>
    <xsl:apply-templates select="child::choix"/><br/>
  </xsl:template>



  <xsl:template match = "libelle">
    <h2><xsl:value-of select="count(preceding::question)"/>
    <xsl:value-of select="."/><br/></h2>
  </xsl:template>



  <xsl:template match="choix">

    
    <xsl:if test ="count(../choix[@score>0])>1">
      <input type="checkbox" name="{count(preceding::question)}[]" value="{@score}"/><xsl:value-of select="."/><br/>
    </xsl:if>
    <xsl:if test ="count(../choix[@score>0])=1">
      <input type="radio" name="{count(preceding::question)}" value="{@score}"/><xsl:value-of select="."/><br/>
    </xsl:if>


    <!--<input type="radio" name="{count(preceding::question)}" value="{@score}"/><xsl:value-of select="."/><br/>-->

  </xsl:template>

</xsl:stylesheet>
