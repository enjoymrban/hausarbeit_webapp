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