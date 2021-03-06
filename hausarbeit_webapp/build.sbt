name := """hausarbeit_webapp"""
organization := "ch.htwchur"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.12.4"

libraryDependencies += guice


libraryDependencies ++= Seq(
  evolutions,
  javaJdbc,
  javaJpa,
  "org.hibernate" % "hibernate-entitymanager" % "5.1.0.Final",
  "com.h2database" % "h2" % "1.4.192"
)
PlayKeys.externalizeResources := false

libraryDependencies ++= Seq(
  "org.webjars" % "bootstrap" % "4.0.0",
  "org.webjars" % "jquery" % "3.2.1",
  "org.webjars" % "popper.js" % "1.12.9",
  "org.webjars" % "sammy" % "0.7.4",
  "org.webjars" % "material-design-icons" % "3.0.1"
)

herokuAppName in Compile := "jklearnapp"